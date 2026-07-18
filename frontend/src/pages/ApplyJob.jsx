import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const submitProposal = async (e) => {
    e.preventDefault();

    try {
      await api.post("/proposals/apply", {
        jobId: id,
        coverLetter,
        bidAmount,
      });

      toast.success("Application Submitted Successfully!");
      navigate("/my-proposals");
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to submit application.");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Apply for Job</h2>

      <form onSubmit={submitProposal}>
        <div style={{ marginBottom: "15px" }}>
          <label>Bid Amount</label>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Cover Letter</label>
          <textarea
            rows="6"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit Proposal
        </button>
      </form>
    </div>
  );
}

export default ApplyJob;