import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function JobProposals() {
  const { jobId } = useParams();

  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
  try {
    console.log("Job ID:", jobId);

    const res = await api.get(`/proposals/job/${jobId}`);

    console.log("API Response:", res.data);

    console.log("Proposals:", res.data.proposals);

setProposals(res.data.proposals);
  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
  }
};
  const updateStatus = async (proposalId, status) => {
    try {
      await api.put(`/proposals/${proposalId}/status`, { status });

      alert(`Proposal ${status}`);

      fetchProposals();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to update proposal status");
    }
  };
console.log("State proposals:", proposals);
  return (
    <div style={{ padding: "30px" }}>
      <h2>Job Proposals</h2>

      <p>Total Proposals: {proposals.length}</p>

{proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        proposals.map((proposal) => (
          <div
            key={proposal._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{proposal.freelancer?.name}</h3>

            <p>
              <strong>Email:</strong> {proposal.freelancer?.email}
            </p>

            <p>
              <strong>Bid Amount:</strong> ₹{proposal.bidAmount}
            </p>

            <p>
              <strong>Cover Letter:</strong>
            </p>

            <p>{proposal.coverLetter}</p>

            <p>
              <strong>Status:</strong> {proposal.status}
            </p>

          {proposal.status === "Pending" ? (
  <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
    <button
      onClick={() => updateStatus(proposal._id, "Accepted")}
      style={{
        background: "green",
        color: "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Accept
    </button>

    <button
      onClick={() => updateStatus(proposal._id, "Rejected")}
      style={{
        background: "red",
        color: "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Reject
    </button>
  </div>
) : (
  <p
    style={{
      fontWeight: "bold",
      color: proposal.status === "Accepted" ? "green" : "red",
      marginTop: "15px",
    }}
  >
    {proposal.status === "Accepted"
      ? "✔ Proposal Accepted"
      : "❌ Proposal Rejected"}
  </p>
)}  
          </div>
        ))
      )}
    </div>
  );
}

export default JobProposals;