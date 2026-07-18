import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token) return;

    fetchNotifications();

    // Refresh every 10 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [token]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");

      const unreadCount = res.data.notifications.filter(
        (notification) => !notification.isRead
      ).length;

      setCount(unreadCount);
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
        padding: "15px 30px",
        backgroundColor: "#2563eb",
        color: "#fff",
      }}
    >
      <h2>SkillSphere</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
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
            {/* Dashboard */}
            {user?.role === "freelancer" && (
              <Link
                to="/dashboard"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Dashboard
              </Link>
            )}

            {user?.role === "client" && (
              <Link
                to="/client-dashboard"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Dashboard
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin-dashboard"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Dashboard
              </Link>
            )}

            {/* Freelancer Links */}
            {user?.role === "freelancer" && (
              <>
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
                textDecoration: "none",
                color: "#fff",
                fontSize: "26px",
              }}
            >
              🔔

              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: "999px",
                    minWidth: "20px",
                    height: "20px",
                    padding: "0 5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "8px 14px",
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