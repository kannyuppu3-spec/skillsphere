import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

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
        padding: "15px 30px",
        backgroundColor: "#2563eb",
        color: "white",
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
            color: "white",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        {!token ? (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Freelancer Dashboard */}
            {user?.role === "freelancer" && (
              <Link
                to="/dashboard"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Dashboard
              </Link>
            )}

            {/* Client Dashboard */}
            {user?.role === "client" && (
              <Link
                to="/client-dashboard"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Dashboard
              </Link>
            )}

            {/* Admin Dashboard */}
            {user?.role === "admin" && (
              <Link
                to="/admin-dashboard"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Dashboard
              </Link>
            )}

            {/* Freelancer Links */}
            {user?.role === "freelancer" && (
              <>
                <Link
                  to="/my-proposals"
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  My Proposals
                </Link>

                <Link
                  to="/reviews"
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Reviews
                </Link>
              </>
            )}

            {/* Chat for all logged-in users */}
            <Link
              to="/chat"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Chat
            </Link>

            {/* Notifications */}
            <Link
              to="/notifications"
              style={{
                position: "relative",
                textDecoration: "none",
                color: "white",
                fontSize: "24px",
              }}
            >
              🔔

              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
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

            <button
              onClick={handleLogout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
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