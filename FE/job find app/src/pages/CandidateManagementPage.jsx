import React, { useEffect, useState } from "react";
import CandidateCreate from "../components/Candidate/CandidateCreate";
import CandidateEdit from "../components/Candidate/CandidateEdit";
import CandidateList from "../components/Candidate/CandidateList";
import "../styles/candidate.css";

export default function CandidateManagementPage() {
    const [candidates, setCandidates] = useState([]);

    const loadData = async () => {
        const res = await fetch("http://localhost:3000/candidates");
        setCandidates(await res.json());
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="page-container">
            <h1 className="section-title">Candidate Management</h1>

            {/* Row 1: Create + List */}
            <div className="flex-row">
                <CandidateCreate refreshData={loadData} />
                <CandidateList list={candidates} />
            </div>

            {/* Row 2: Update/Delete */}
            <CandidateEdit refreshData={loadData} />
        </div>
    );
}
