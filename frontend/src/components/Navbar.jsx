import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#2563eb",
        color: "white",
      }}
    >
      <h2>SkillSphere</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Login
        </Link>

        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          Register
        </Link>

        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;