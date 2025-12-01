import { useEffect, useState } from "react";
import axios from "axios";

export default function JobList({ reload }) {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
  axios.get("http://localhost:3000/jobs").then((res) => {
    setJobs(res.data);
  });
  }, [reload]);


  // ===================== FILTER =====================
  const filteredJobs = jobs
    .filter((job) => {
      if (searchTitle && !job.JobTitle.toLowerCase().includes(searchTitle.toLowerCase())) {
        return false;
      }
      if (searchLocation && !job.JobLocation.toLowerCase().includes(searchLocation.toLowerCase())) {
        return false;
      }
      if (minSalary) {
        const min = parseInt(minSalary);
        if (isNaN(min) || min < 0) return false;
        if (job.MinSalary < min) return false;
      }
      return true;
    });

  // ===================== SORT =====================
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (!sortField) return 0;

    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // ===================== VALIDATION =====================
  const onChangeSalary = (e) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // chỉ cho số
    if (parseInt(val) > 1000000000) return; // max 1 tỷ
    setMinSalary(val);
  };

  return (
    <div>
      <h2>Danh sách Job Posting</h2>

      {/* SEARCH BAR */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search Job Title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          placeholder="Search Location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          placeholder="Min Salary"
          value={minSalary}
          onChange={onChangeSalary}
          style={{ marginRight: "10px" }}
        />

        {/* SORT */}
        <select onChange={(e) => setSortField(e.target.value)} style={{ marginRight: "10px" }}>
          <option value="">Sort by...</option>
          <option value="JobTitle">Job Title</option>
          <option value="MinSalary">Min Salary</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Description</th>
            <th>Salary</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {sortedJobs.map((job) => (
            <tr key={job.JobID}>
              <td>{job.JobID}</td>
              <td>{job.JobTitle}</td>
              <td>{job.JobDescription}</td>
              <td>{job.MinSalary} - {job.MaxSalary}</td>
              <td>{job.JobLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
