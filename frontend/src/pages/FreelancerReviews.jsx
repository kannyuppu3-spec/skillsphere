import { useEffect, useState } from "react";
import api from "../services/api";

function FreelancerReviews() {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState({
    averageRating: 0,
    totalReviews: 0,
  });

  // Replace with your freelancer MongoDB ID
  const freelancerId = "6a3d47edf744c9da1fda4ceb";

  useEffect(() => {
    fetchReviews();
    fetchAverage();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/${freelancerId}`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const fetchAverage = async () => {
    try {
      const res = await api.get(`/reviews/average/${freelancerId}`);
      setAverage(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Freelancer Reviews
      </h1>

      {/* Average Rating */}
      <div
        style={{
          marginBottom: "25px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h2>
          ⭐ {average.averageRating} / 5
        </h2>

        <p>
          Total Reviews: <strong>{average.totalReviews}</strong>
        </p>
      </div>

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          No Reviews Yet
        </div>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>
              {"⭐".repeat(review.rating)}
            </h3>

            <p>
              <strong>Reviewer:</strong>{" "}
              {review.reviewer?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {review.reviewer?.email}
            </p>

            <p>
              <strong>Comment:</strong>
            </p>

            <p>{review.comment}</p>

            <hr />

            <small>
              {new Date(review.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default FreelancerReviews;