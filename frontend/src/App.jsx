import { Routes, Route } from "react-router-dom";
import ClientDashboard from "./pages/ClientDashboard";
import Navbar from "./components/Navbar";
import ApplyJob from "./pages/ApplyJob";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProposals from "./pages/MyProposals";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
  path="/dashboard"
  element={
    <ProtectedRoute role="freelancer">
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/client-dashboard"
  element={
    <ProtectedRoute role="client">
      <ClientDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/apply/:id"
  element={
    <ProtectedRoute role="freelancer">
      <ApplyJob />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-proposals"
  element={
    <ProtectedRoute role="freelancer">
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