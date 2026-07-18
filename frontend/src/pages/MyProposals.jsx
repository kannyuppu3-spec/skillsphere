import { useEffect, useState } from "react";
import api from "../services/api";

function MyProposals() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchMyProposals();
  }, []);

  const fetchMyProposals = async () => {
    try {
      const res = await api.get("/proposals/my");
      setProposals(res.data.proposals);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Proposals</h2>

      {proposals.length === 0 ? (
        <p>You haven't applied for any jobs yet.</p>
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
            <h3>{proposal.job?.title}</h3>

            <p>
              <strong>Budget:</strong> ₹{proposal.job?.budget}
            </p>

            <p>
              <strong>Job Status:</strong> {proposal.job?.status}
            </p>

            <p>
              <strong>My Bid:</strong> ₹{proposal.bidAmount}
            </p>

            <p>
              <strong>Cover Letter:</strong>
            </p>

            <p>{proposal.coverLetter}</p>

            <p>
              <strong>Proposal Status:</strong> {proposal.status}
            </p>

            {proposal.status === "Pending" && (
              <p
                style={{
                  color: "#f59e0b",
                  fontWeight: "bold",
                  marginTop: "15px",
                }}
              >
                ⏳ Waiting for client response
              </p>
            )}

            {proposal.status === "Accepted" && (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginTop: "15px",
                }}
              >
                ✅ Congratulations! Your proposal has been accepted.
              </p>
            )}

            {proposal.status === "Rejected" && (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginTop: "15px",
                }}
              >
                ❌ Your proposal was not selected.
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyProposals;