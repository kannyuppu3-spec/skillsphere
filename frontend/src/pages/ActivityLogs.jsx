import { useEffect, useState } from "react";
import api from "../services/api";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/activity-logs");
      setLogs(res.data.logs);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Activity Logs</h2>

      <p>Total Logs: {logs.length}</p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "#fff" }}>
            <th style={th}>User</th>
            <th style={th}>Role</th>
            <th style={th}>Action</th>
            <th style={th}>Description</th>
            <th style={th}>Date</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td style={td}>{log.performedBy?.name}</td>
              <td style={td}>{log.performedBy?.role}</td>
              <td style={td}>{log.action}</td>
              <td style={td}>{log.description}</td>
              <td style={td}>
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  border: "1px solid #ddd",
  padding: "12px",
};

const td = {
  border: "1px solid #ddd",
  padding: "10px",
};

export default ActivityLogs;