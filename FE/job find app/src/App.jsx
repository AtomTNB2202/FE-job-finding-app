import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import JobManagementPage from "./pages/JobManagementPage";
import CandidateManagementPage from "./pages/CandidateManagementPage";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/jobs" element={<JobManagementPage />} />
        <Route path="/candidates" element={<CandidateManagementPage />} />
      </Routes>
    </>
  );
}
