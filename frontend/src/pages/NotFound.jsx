import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "90px",
          color: "#2563eb",
          marginBottom: "10px",
        }}
      >
        404
      </h1>

      <h2>Oops! Page Not Found</h2>

      <p
        style={{
          color: "#666",
          maxWidth: "450px",
          marginBottom: "25px",
        }}
      >
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link to="/">
        <button
          style={{
            padding: "12px 24px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Go Back Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;