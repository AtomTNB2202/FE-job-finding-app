import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 20 }}>
      <Link to="/jobs" style={{ marginRight: 20 }}>Job Management</Link>
      <Link to="/candidates">Candidate Management</Link>
    </nav>
  );
}
