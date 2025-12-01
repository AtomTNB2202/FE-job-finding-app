const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CẤU HÌNH SQL SERVER CỦA BẠN
const config = {
  user: "sa",
  password: "123456",  // nhập đúng password bạn dùng trong SSMS
  server: "LAPTOP-CVKEMCAK",   // Sửa dòng này !!!
  database: "JobRecruitmentPlatform",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};


// ====================== GET ALL JOBS ======================
app.get("/jobs", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * FROM JOB_POSTING");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ====================== INSERT JOB ======================
app.post("/jobs", async (req, res) => {
  const { JobTitle, JobDescription, CompanyID, EmployerID } = req.body;

  try {
    let pool = await sql.connect(config);
    await pool.request()
      .input("JobTitle", sql.NVarChar, JobTitle)
      .input("JobDescription", sql.NVarChar, JobDescription)
      .input("CompanyID", sql.Int, CompanyID)
      .input("EmployerID", sql.Int, EmployerID)
      .query(`
        INSERT INTO JOB_POSTING 
        (JobTitle, JobDescription, CompanyID, EmployerID, ApplicationDeadline) 
        VALUES (@JobTitle, @JobDescription, @CompanyID, @EmployerID, GETDATE()+30)
      `);

    res.send("Inserted!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// ====================== DELETE JOB ======================
app.delete("/jobs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let pool = await sql.connect(config);

    const result = await pool.request()
      .input("JobID", sql.Int, id)
      .query(`
        DELETE FROM JOB_POSTING
        WHERE JobID = @JobID
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send({ message: "Job not found" });
    }

    res.send({ message: "Deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log("Backend chạy tại: http://localhost:3000"));

// ===================================================================
// Call Stored Procedure: sp_GetJobsByMinSalary
// ===================================================================

app.get("/proc/minsalary/:value", async (req, res) => {
  const value = parseInt(req.params.value);

  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input("minSalary", sql.Int, value)
      .execute("sp_GetJobsByMinSalary");

    res.json(result.recordset);

  } catch (err) {
    res.status(500).send(err);
  }
});

// ===================================================================
// Hàm giữ giá trị cũ nếu input null / undefined / "" 
// ===================================================================
function keepOrOld(newValue, oldValue) {
  if (newValue === undefined || newValue === null || newValue === "") {
    return oldValue;
  }
  return newValue;
}

// ===================================================================
// UPDATE JOB
// ===================================================================
app.put("/jobs/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description, minSalary, maxSalary, location } = req.body;

  try {
    let pool = await sql.connect(config);

    // Lấy dữ liệu cũ
    const oldJob = await pool.request()
      .input("JobID", sql.Int, id)
      .query("SELECT * FROM JOB_POSTING WHERE JobID = @JobID");

    if (oldJob.recordset.length === 0)
      return res.status(404).send("Job not found");

    const old = oldJob.recordset[0];

    // ⭐ Giữ giá trị cũ nếu user không nhập
    const newTitle = keepOrOld(title, old.JobTitle);
    const newDesc = keepOrOld(description, old.JobDescription);
    const newMin = keepOrOld(minSalary, old.MinSalary);
    const newMax = keepOrOld(maxSalary, old.MaxSalary);
    const newLoc = keepOrOld(location, old.JobLocation);

    // Update
    await pool.request()
      .input("JobID", sql.Int, id)
      .input("JobTitle", sql.NVarChar, newTitle)
      .input("JobDescription", sql.NVarChar, newDesc)
      .input("MinSalary", sql.Int, newMin)
      .input("MaxSalary", sql.Int, newMax)
      .input("JobLocation", sql.NVarChar, newLoc)
      .query(`
        UPDATE JOB_POSTING
        SET JobTitle=@JobTitle,
            JobDescription=@JobDescription,
            MinSalary=@MinSalary,
            MaxSalary=@MaxSalary,
            JobLocation=@JobLocation
        WHERE JobID = @JobID
      `);

    res.send({ message: "Job updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// ====================== GET ALL CANDIDATES ======================
app.get("/candidates", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * FROM CANDIDATE");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ====================== CREATE CANDIDATE ======================
app.post("/candidates", async (req, res) => {
  const { UserID, DOB, Gender, CurrentLocation, DesiredSalary, YearsOfExperience } = req.body;

  try {
    let pool = await sql.connect(config);

    await pool.request()
      .input("UserID", sql.Int, UserID)
      .input("DOB", sql.Date, DOB)
      .input("Gender", sql.NVarChar, Gender)
      .input("CurrentLocation", sql.NVarChar, CurrentLocation)
      .input("DesiredSalary", sql.Int, DesiredSalary)
      .input("YearsOfExperience", sql.Int, YearsOfExperience)
      .query(`
        INSERT INTO CANDIDATE (UserID, DOB, Gender, CurrentLocation, DesiredSalary, YearsOfExperience)
        VALUES (@UserID, @DOB, @Gender, @CurrentLocation, @DesiredSalary, @YearsOfExperience)
      `);

    res.json({ message: "Candidate created successfully" });

  } catch (err) {
    res.status(500).send(err);
  }
});

// ====================== UPDATE CANDIDATE ======================
app.put("/candidates/:id", async (req, res) => {
  const id = req.params.id;
  const { Gender, CurrentLocation, DesiredSalary, YearsOfExperience } = req.body;

  try {
    let pool = await sql.connect(config);

    await pool.request()
      .input("CandidateID", sql.Int, id)
      .input("Gender", sql.NVarChar, Gender)
      .input("CurrentLocation", sql.NVarChar, CurrentLocation)
      .input("DesiredSalary", sql.Int, DesiredSalary)
      .input("YearsOfExperience", sql.Int, YearsOfExperience)
      .query(`
        UPDATE CANDIDATE
        SET Gender=@Gender,
            CurrentLocation=@CurrentLocation,
            DesiredSalary=@DesiredSalary,
            YearsOfExperience=@YearsOfExperience
        WHERE CandidateID=@CandidateID
      `);

    res.json({ message: "Candidate updated successfully" });

  } catch (err) {
    res.status(500).send(err);
  }
});

// ====================== DELETE CANDIDATE ======================
app.delete("/candidates/:id", async (req, res) => {
  try {
    let pool = await sql.connect(config);

    await pool.request()
      .input("CandidateID", sql.Int, req.params.id)
      .query(`DELETE FROM CANDIDATE WHERE CandidateID=@CandidateID`);

    res.json({ message: "Candidate deleted" });

  } catch (err) {
    res.status(500).send(err);
  }
});







