import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalProjects: 0,
    totalProposals: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <h1>{stats.totalUsers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Jobs</h3>
          <h1>{stats.totalJobs}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Projects</h3>
          <h1>{stats.totalProjects}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Proposals</h3>
          <h1>{stats.totalProposals}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Reviews</h3>
          <h1>{stats.totalReviews}</h1>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

export default AdminDashboard;