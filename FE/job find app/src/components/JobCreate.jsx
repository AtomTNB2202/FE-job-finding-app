import { useState } from "react";
import axios from "axios";

export default function JobCreate({ onChange }) {
  const [form, setForm] = useState({
    JobTitle: "",
    JobDescription: "",
    CompanyID: 1,
    EmployerID: 1,
  });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/jobs", form);
    alert("Đã thêm job!");
    onChange();
  };

  return (
    <div>
      <h2>Thêm Job</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Job Title"
          value={form.JobTitle}
          onChange={(e) => setForm({ ...form, JobTitle: e.target.value })}
        />

        <br /><br />

        <textarea
          placeholder="Job Description"
          value={form.JobDescription}
          onChange={(e) =>
            setForm({ ...form, JobDescription: e.target.value })
          }
        ></textarea>

        <br /><br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
