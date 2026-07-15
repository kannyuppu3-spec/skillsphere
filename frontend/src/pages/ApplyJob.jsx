import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    coverLetter: "",
    bidAmount: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/proposals/apply", {
        jobId: id,
        coverLetter: form.coverLetter,
        bidAmount: Number(form.bidAmount),
      });

      alert("Proposal Submitted Successfully!");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Submission Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Apply for Job</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          name="coverLetter"
          placeholder="Write your cover letter..."
          value={form.coverLetter}
          onChange={handleChange}
          rows="6"
          cols="50"
        />

        <br /><br />

        <input
          type="number"
          name="bidAmount"
          placeholder="Bid Amount"
          value={form.bidAmount}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Submit Proposal
        </button>
      </form>
    </div>
  );
}

export default ApplyJob;