
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalProjects: 0,
    totalProposals: 0,
    totalReviews: 0,
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

 useEffect(() => {
  fetchStats();
  fetchUsers();

  const interval = setInterval(() => {
    fetchStats();
    fetchUsers();
  }, 30000); // Refresh every 30 seconds

  return () => clearInterval(interval);
}, []);
  // Dashboard Stats
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
  try {
    const res = await api.get("/admin/users");

    setUsers(res.data.users);
  } catch (err) {
    console.log(err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};
  // Delete User
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

  // Update Role
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

  // Search + Filter + Sort
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }

      return b.name.localeCompare(a.name);
    });

  // Role Summary
  const roleStats = {
    admin: users.filter((u) => u.role === "admin").length,
    client: users.filter((u) => u.role === "client").length,
    freelancer: users.filter((u) => u.role === "freelancer").length,
  };
// Pie Chart Data
const pieData = {
  labels: ["Admins", "Clients", "Freelancers"],
  datasets: [
    {
      label: "Users",
      data: [
        roleStats.admin,
        roleStats.client,
        roleStats.freelancer,
      ],
      backgroundColor: [
        "#ef4444",
        "#3b82f6",
        "#22c55e",
      ],
      borderWidth: 1,
    },
  ],
};

// Bar Chart Data
const barData = {
  labels: [
    "Users",
    "Jobs",
    "Projects",
    "Proposals",
    "Reviews",
  ],
  datasets: [
    {
      label: "Platform Statistics",
      data: [
        stats.totalUsers,
        stats.totalJobs,
        stats.totalProjects,
        stats.totalProposals,
        stats.totalReviews,
      ],
      backgroundColor: [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#ef4444",
      ],
    },
  ],
};
const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "User Role Distribution",
    },
  },
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Platform Statistics",
    },
  },
};
  // CSV Export
  const csvData = users.map((user) => ({
    Name: user.name,
    Email: user.email,
    Role: user.role,
    Joined: new Date(user.createdAt).toLocaleDateString(),
  }));

  return (
    
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      ><Link to="/activity-logs">
  <button
    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      marginBottom: "20px",
    }}
  >
    View Activity Logs
  </button>
</Link>
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

      {/* User Role Summary */}
      <h2>User Role Summary</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>👑 Admins</h3>
          <h1>{roleStats.admin}</h1>
        </div>

        <div style={cardStyle}>
          <h3>👤 Clients</h3>
          <h1>{roleStats.client}</h1>
        </div>

        <div style={cardStyle}>
          <h3>💻 Freelancers</h3>
          <h1>{roleStats.freelancer}</h1>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Charts */}
<h2 style={{ marginTop: "40px" }}>Analytics Overview</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "30px",
    marginTop: "20px",
    marginBottom: "40px",
  }}
>
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <h3>User Role Distribution</h3>

    <Pie data={pieData} options={pieOptions} />
  </div>

  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <h3>Platform Statistics</h3>

    <Bar data={barData} options={barOptions} />
  </div>
</div>
        <h2>All Registered Users</h2>

        
      </div>

      {/* Search / Filter / Sort */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      ><CSVLink
          data={csvData}
          filename="skillsphere-users.csv"
          style={{
            background: "#16a34a",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Export CSV
        </CSVLink>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
          }}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </div>

   {/* Users Table */}
<h2 style={{ marginTop: "30px" }}>All Users</h2>

{loading ? (
  <p>Loading users...</p>
) : (
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    }}
  >
    <thead>
      <tr style={{ background: "#2563eb", color: "white" }}>
        <th style={thStyle}>Name</th>
        <th style={thStyle}>Email</th>
        <th style={thStyle}>Role</th>
        <th style={thStyle}>Joined</th>
        <th style={thStyle}>Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredUsers.map((user) => (
        <tr key={user._id}>
          <td style={tdStyle}>{user.name}</td>

          <td style={tdStyle}>{user.email}</td>

          <td style={tdStyle}>
            <select
              value={user.role}
              onChange={(e) => updateRole(user._id, e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </td>

          <td style={tdStyle}>
            {new Date(user.createdAt).toLocaleDateString()}
          </td>

          <td style={tdStyle}>
            <button
              onClick={() => deleteUser(user._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 14px",
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
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
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

