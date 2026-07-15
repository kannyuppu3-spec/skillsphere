import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h2>Welcome, {user?.name} 👋</h2>

      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <hr />

      <h2>Available Jobs</h2>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  }}
>
  {jobs.map((job) => (
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
      {jobs.length === 0 ? (
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

export default Dashboard;