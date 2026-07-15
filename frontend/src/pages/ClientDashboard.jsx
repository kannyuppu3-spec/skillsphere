import { Link } from "react-router-dom";

function ClientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Client Dashboard</h1>

      <h3>Welcome, {user?.name} 👋</h3>

      <p>Email: {user?.email}</p>

      <p>Role: {user?.role}</p>

      <hr />

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Link to="/create-job">
          <button>Create New Job</button>
        </Link>

        <Link to="/my-jobs">
          <button>My Jobs</button>
        </Link>
      </div>
    </div>
  );
}

export default ClientDashboard;