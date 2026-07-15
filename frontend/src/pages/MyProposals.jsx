import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
function MyProposals() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const res = await api.get("/proposals/my");
      setProposals(res.data.proposals);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
        <Link to="/dashboard">
  ← Back to Dashboard
</Link>
      <h2>My Proposals</h2>

      {proposals.length === 0 ? (
        <p>No proposals submitted yet.</p>
      ) : (
        proposals.map((proposal) => (
         <div
  key={proposal._id}
  style={{
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}
>
  <h3>{proposal.job?.title || "Job Title"}</h3>

  <p>
    <strong>Bid Amount:</strong> ₹{proposal.bidAmount}
  </p>

  <p>
    <strong>Status:</strong>{" "}
    <span
      style={{
        color:
          proposal.status === "Accepted"
            ? "green"
            : proposal.status === "Rejected"
            ? "red"
            : "orange",
        fontWeight: "bold",
      }}
    >
      {proposal.status}
    </span>
  </p>

  <p>
    <strong>Cover Letter:</strong>
  </p>

  <p>{proposal.coverLetter}</p>

  <p>
    <strong>Applied On:</strong>{" "}
    {new Date(proposal.createdAt).toLocaleDateString()}
  </p>
</div> 
        ))
      )}
    </div>
  );
}

export default MyProposals;