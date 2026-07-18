import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");

      const unread = res.data.notifications.filter(
        (notification) => !notification.isRead
      );

      setCount(unread.length);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#2563eb",
        padding: "15px 30px",
        color: "#fff",
        flexWrap: "wrap",
      }}
    >
      <h2 style={{ margin: 0 }}>SkillSphere</h2>

      <div
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Home */}
        <Link
          to="/"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Home
        </Link>

        {!token ? (
          <>
            <Link
              to="/login"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Freelancer */}
            {user?.role === "freelancer" && (
              <>
                <Link
                  to="/dashboard"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Profile
                </Link>

                <Link
                  to="/portfolio"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Portfolio
                </Link>

                <Link
                  to="/resume"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Resume
                </Link>

                <Link
                  to="/my-proposals"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  My Proposals
                </Link>

                <Link
                  to="/reviews"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Reviews
                </Link>
              </>
            )}

            {/* Client */}
            {user?.role === "client" && (
              <>
                <Link
                  to="/client-dashboard"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Profile
                </Link>
              </>
            )}

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin-dashboard"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Dashboard
                </Link>

                <Link
                  to="/activity-logs"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Activity Logs
                </Link>
              </>
            )}

            {/* Chat */}
            <Link
              to="/chat"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Chat
            </Link>

            {/* Notifications */}
            <Link
              to="/notifications"
              style={{
                position: "relative",
                color: "#fff",
                textDecoration: "none",
                fontSize: "22px",
              }}
            >
              🔔

              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "red",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {count}
                </span>
              )}
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;