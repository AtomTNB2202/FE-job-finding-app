import JobCreate from "../components/JobCreate";
import JobEdit from "../components/JobEdit";
import JobList from "../components/JobList";
import { useState } from "react";
import "./jobManagement.css";

export default function JobManagementPage() {
  const [reloadFlag, setReloadFlag] = useState(false);

  const reloadJobs = () => setReloadFlag(!reloadFlag);

  return (
    <div className="job-admin-container">
      <h1 className="job-admin-title">Job Management</h1>

      <div className="job-admin-grid">
        
        {/* LEFT SIDE: CREATE + EDIT */}
        <div className="job-admin-left">
          <div className="panel">
            <JobCreate onChange={reloadJobs} />
          </div>

          <div className="panel">
            <JobEdit onChange={reloadJobs} />
          </div>
        </div>

        {/* RIGHT SIDE: JOB TABLE */}
        <div className="job-admin-right panel">
          <JobList reload={reloadFlag} />
        </div>

      </div>
    </div>
  );
}
