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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  // Fetch Dashboard Statistics
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Fetch All Users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };
  const deleteUser = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/admin/users/${id}`);

    alert("User deleted successfully!");

    fetchUsers();
    fetchStats();
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Failed to delete user.");
  }
};
const updateRole = async (id, role) => {
  try {
    await api.put(`/admin/users/${id}/role`, {
      role,
    });

    alert("User role updated successfully!");

    fetchUsers();
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Failed to update role.");
  }
};
  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: "20px",
          marginBottom: "40px",
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

      {/* Users Table */}
      <h2>All Registered Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
  <th style={thStyle}>Name</th>
  <th style={thStyle}>Email</th>
  <th style={thStyle}>Role</th>
  <th style={thStyle}>Actions</th>
</tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
  <td style={tdStyle}>{user.name}</td>
  <td style={tdStyle}>{user.email}</td>
  <td style={tdStyle}>
  <select
    value={user.role}
    onChange={(e) => updateRole(user._id, e.target.value)}
  >
    <option value="client">Client</option>
    <option value="freelancer">Freelancer</option>
    <option value="admin">Admin</option>
  </select>
</td>

  <td style={tdStyle}>
    <button
      onClick={() => deleteUser(user._id)}
      style={{
        background: "red",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  </td>
</tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

export default AdminDashboard;