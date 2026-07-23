import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
  try {
    const res = await api.get("/jobs/my");

    console.log("API Response:", res.data);

    setJobs(res.data.jobs);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${id}`);
      alert("Job deleted successfully!");
      fetchJobs();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete job.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Client Dashboard</h1>

      <h2>My Posted Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
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

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigate(`/job/${job._id}/proposals`)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Proposals
              </button>

              <button
                onClick={() => deleteJob(job._id)}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete Job
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ClientDashboard;