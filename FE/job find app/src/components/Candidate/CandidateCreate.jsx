import React, { useState } from "react";
import "../../styles/candidate.css";

export default function CandidateCreate({ refreshData }) {
    const [form, setForm] = useState({
        UserID: "",
        DOB: "",
        Gender: "",
        CurrentLocation: "",
        DesiredSalary: "",
        YearsOfExperience: "",
    });

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const createCandidate = async () => {
        await fetch("http://localhost:3000/candidates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        refreshData();
    };

    return (
        <div className="card" style={{ width: "35%" }}>
            <h3>Create Candidate</h3>

            <input name="UserID" className="input" placeholder="User ID" onChange={onChange} />

            <input name="DOB" type="date" className="input" onChange={onChange} />

            <input name="Gender" className="input" placeholder="Gender" onChange={onChange} />

            <input name="CurrentLocation" className="input" placeholder="Current Location" onChange={onChange} />

            <input name="DesiredSalary" className="input" placeholder="Desired Salary" onChange={onChange} />

            <input name="YearsOfExperience" className="input" placeholder="Years of Experience" onChange={onChange} />

            <button className="btn-green" onClick={createCandidate}>Create</button>
        </div>
    );
}
