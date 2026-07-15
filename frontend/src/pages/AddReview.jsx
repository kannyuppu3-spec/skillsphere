import { useState } from "react";
import api from "../services/api";

function AddReview() {
  const [form, setForm] = useState({
    freelancer: "",
    rating: 5,
    comment: "",
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
      const res = await api.post("/reviews", form);

      alert(res.data.message);

      setForm({
        freelancer: "",
        rating: 5,
        comment: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h2>Add Review</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="freelancer"
          placeholder="Freelancer ID"
          value={form.freelancer}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          name="comment"
          placeholder="Write your review..."
          value={form.comment}
          onChange={handleChange}
          style={{
            width: "100%",
            height: "120px",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default AddReview;