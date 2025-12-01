import React from "react";
import "../../styles/candidate.css";

export default function CandidateList({ list }) {
    return (
        <div className="card" style={{ width: "65%" }}>
            <h3>Candidate List</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserID</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Location</th>
                        <th>Salary</th>
                        <th>Experience</th>
                    </tr>
                </thead>

                <tbody>
                    {list.map((c) => (
                        <tr className="table-row" key={c.CandidateID}>
                            <td>{c.CandidateID}</td>
                            <td>{c.UserID}</td>
                            <td>{c.Gender}</td>
                            <td>{c.DOB?.substring(0, 10)}</td>
                            <td>{c.CurrentLocation}</td>
                            <td>{c.DesiredSalary}</td>
                            <td>{c.YearsOfExperience}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
