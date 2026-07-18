import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);
import { Link } from "react-router-dom";
function Dashboard() {
  const [stats, setStats] = useState({
  jobs: 0,
  proposals: 0,
  reviews: 0,
  notifications: 0,
});
const [currentPage, setCurrentPage] = useState(1);

const jobsPerPage = 5;
  const [search, setSearch] = useState("");
const [skill, setSkill] = useState("");
const [sort, setSort] = useState("latest");
  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    fetchJobs();
    fetchStats();
    fetchRecentActivities();
  }, []);
const fetchRecentActivities = async () => {
  try {
    const res = await api.get("/notifications");

    setRecentActivities(
      (res.data.notifications || []).slice(0, 5)
    );
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };
const fetchStats = async () => {
  try {
    setLoading(true);

    const [jobs, proposals, reviews, notifications] =
      await Promise.all([
        api.get("/jobs"),
        api.get("/proposals/my"),
        api.get("/reviews/my"),
        api.get("/notifications"),
      ]);

    setStats({
      jobs: jobs.data.jobs?.length || 0,
      proposals: proposals.data.proposals?.length || 0,
      reviews: reviews.data.reviews?.length || 0,
      notifications:
        notifications.data.notifications?.filter(
          (n) => !n.isRead
        ).length || 0,
    });
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
const barData = {
  labels: ["Jobs", "Proposals", "Reviews", "Notifications"],
  datasets: [
    {
      label: "Dashboard Statistics",
      data: [
        stats.jobs,
        stats.proposals,
        stats.reviews,
        stats.notifications,
      ],
      backgroundColor: [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#dc2626",
      ],
    },
  ],
};

const doughnutData = {
  labels: ["Jobs", "Proposals", "Reviews", "Notifications"],
  datasets: [
    {
      data: [
        stats.jobs,
        stats.proposals,
        stats.reviews,
        stats.notifications,
      ],
      backgroundColor: [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#dc2626",
      ],
    },
  ],
};
if (loading) {
  return <Loading />;
}
const filteredJobs = [...jobs]
  .filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter((job) =>
    skill === ""
      ? true
      : (job.skills || [])
          .join(" ")
          .toLowerCase()
          .includes(skill.toLowerCase())
  )
  .sort((a, b) => {
    if (sort === "budgetHigh") return b.budget - a.budget;
    if (sort === "budgetLow") return a.budget - b.budget;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;

const currentJobs = filteredJobs.slice(
  indexOfFirstJob,
  indexOfLastJob
);

const totalPages = Math.ceil(
  filteredJobs.length / jobsPerPage
);
  return (
    <div style={{ padding: "20px" }}>
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      background: "#2563eb",
      color: "#fff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }}
  >
    <h3>Total Jobs</h3>
    <h1>{stats.jobs}</h1>
  </div>

  <div
    style={{
      background: "#16a34a",
      color: "#fff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }}
  >
    <h3>My Proposals</h3>
    <h1>{stats.proposals}</h1>
  </div>

  <div
    style={{
      background: "#f59e0b",
      color: "#fff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }}
  >
    <h3>Reviews</h3>
    <h1>{stats.reviews}</h1>
  </div>

  <div
    style={{
      background: "#dc2626",
      color: "#fff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }}
  >
    <h3>Notifications</h3>
    <h1>{stats.notifications}</h1>
  </div>
</div>
      <h1>Dashboard</h1>

      <h2>Welcome, {user?.name} 👋</h2>

      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <hr />
<div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "25px",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h3 style={{ marginBottom: "20px" }}>Platform Statistics</h3>

    <Bar data={barData} />
  </div>

  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h3 style={{ marginBottom: "20px" }}>Distribution</h3>

    <Doughnut data={doughnutData} />
  </div>
</div>
<div
  style={{
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>Quick Actions</h2>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
    }}
  >
    <Link to="/profile">
      <button style={buttonStyle}>👤 My Profile</button>
    </Link>

    <Link to="/portfolio">
      <button style={buttonStyle}>💼 Portfolio</button>
    </Link>

    <Link to="/resume">
      <button style={buttonStyle}>📄 Resume</button>
    </Link>

    <Link to="/my-proposals">
      <button style={buttonStyle}>📨 My Proposals</button>
    </Link>

    <Link to="/notifications">
      <button style={buttonStyle}>🔔 Notifications</button>
    </Link>
  </div>
</div>
<div
  style={{
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  }}
>
  <h2>Recent Activity</h2>

  {recentActivities.length === 0 ? (
    <p>No recent activity.</p>
  ) : (
    recentActivities.map((activity) => (
      <div
        key={activity._id}
        style={{
          padding: "12px 0",
          borderBottom: "1px solid #eee",
        }}
      >
        <strong>{activity.title}</strong>

        <p style={{ margin: "5px 0", color: "#555" }}>
          {activity.message}
        </p>
      </div>
    ))
  )}
</div>
<div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    margin: "25px 0",
  }}
>
  <input
    type="text"
    placeholder="Search Job..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: "10px",
      width: "250px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    }}
  />

  <input
    type="text"
    placeholder="Filter by Skill"
    value={skill}
    onChange={(e) => setSkill(e.target.value)}
    style={{
      padding: "10px",
      width: "220px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    }}
  />

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "8px",
    }}
  >
    <option value="latest">Latest</option>
    <option value="budgetHigh">Budget High → Low</option>
    <option value="budgetLow">Budget Low → High</option>
  </select>
</div>
      <h2>Available Jobs</h2>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  }}
>
  {currentJobs.map((job) => (
    <div
      key={job._id}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{job.title}</h3>

      <p>{job.description}</p>

      <p>
        <strong>Budget:</strong> ₹{job.budget}
      </p>

      <p>
        <strong>Status:</strong> {job.status}
      </p>

      <button
  onClick={() => navigate(`/apply/${job._id}`)}
  style={{
    marginTop: "10px",
    padding: "8px 16px",
    cursor: "pointer",
  }}
>
  Apply
</button>
    </div>
  ))}
</div>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    gap: "10px",
  }}
>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    style={{
      padding: "10px 18px",
      cursor: "pointer",
    }}
  >
    ◀ Previous
  </button>

  <span
    style={{
      padding: "10px",
      fontWeight: "bold",
    }}
  >
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage(currentPage + 1)}
    style={{
      padding: "10px 18px",
      cursor: "pointer",
    }}
  >
    Next ▶
  </button>
</div>
      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{job.title}</h3>

            <p>{job.description}</p>

            <p>
              <strong>Budget:</strong> ₹{job.budget}
            </p>

            <p>
              <strong>Status:</strong> {job.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
const buttonStyle = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "bold",
};
export default Dashboard;