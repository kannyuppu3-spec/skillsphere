import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ApplyJob from "./pages/ApplyJob";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProposals from "./pages/MyProposals";
function App() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/apply/:id"
  element={
    <ProtectedRoute>
      <ApplyJob />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-proposals"
  element={
    <ProtectedRoute>
      <MyProposals />
    </ProtectedRoute>
  }
/>
        </Routes>
      </div>
    </>
  );
}

export default App;