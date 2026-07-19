import { useEffect, useState } from "react";
import api from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };
const deleteUser = async (id) => {
  if (!window.confirm("Delete this user?")) return;

  try {
    await api.delete(`/users/${id}`);

    setUsers(users.filter((user) => user._id !== id));
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin - User Management</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.location || "-"}</td>
              <td>
  <button
    onClick={() => deleteUser(user._id)}
    style={{
      background: "red",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;