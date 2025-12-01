import React, { useState } from "react";
import "../../styles/candidate.css";

export default function CandidateEdit({ refreshData }) {
    const [form, setForm] = useState({
        CandidateID: "",
        Gender: "",
        CurrentLocation: "",
        DesiredSalary: "",
        YearsOfExperience: "",
    });

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const updateCandidate = async () => {
        await fetch(`http://localhost:3000/candidates/${form.CandidateID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        refreshData();
    };

    const deleteCandidate = async () => {
        await fetch(`http://localhost:3000/candidates/${form.CandidateID}`, {
            method: "DELETE",
        });
        refreshData();
    };

    return (
        <div className="card">
            <h3>Update / Delete Candidate</h3>

            <input name="CandidateID" className="input" placeholder="Candidate ID" onChange={onChange} />

            <input name="Gender" className="input" placeholder="New Gender" onChange={onChange} />

            <input name="CurrentLocation" className="input" placeholder="New Location" onChange={onChange} />

            <input name="DesiredSalary" className="input" placeholder="New Salary" onChange={onChange} />

            <input name="YearsOfExperience" className="input" placeholder="New Experience" onChange={onChange} />

            <button className="btn-green" onClick={updateCandidate}>Update</button>

            <button className="btn-green" style={{ background: "#dc2626" }} onClick={deleteCandidate}>
                Delete
            </button>
        </div>
    );
}
