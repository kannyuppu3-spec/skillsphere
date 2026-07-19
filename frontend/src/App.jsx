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
import Chat from "./pages/Chat";
import AddReview from "./pages/AddReview";
import FreelancerReviews from "./pages/FreelancerReviews";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import JobProposals from "./pages/JobProposals";
import ActivityLogs from "./pages/ActivityLogs";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import Resume from "./pages/Resume";
import { ToastContainer } from "react-toastify";
import AdminUsers from "./pages/AdminUsers";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
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
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/activity-logs" element={<ProtectedRoute role="admin"><ActivityLogs /></ProtectedRoute>} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="*" element={<NotFound />} />

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
<Route
  path="/chat"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>
<Route
  path="/add-review"
  element={
    <ProtectedRoute>
      <AddReview />
    </ProtectedRoute>
  }
/>
<Route
  path="/reviews"
  element={
    <ProtectedRoute>
      <FreelancerReviews />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/job/:jobId/proposals"
  element={
    <ProtectedRoute role="client">
      <JobProposals />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/portfolio"
  element={
    <ProtectedRoute role="freelancer">
      <Portfolio />
    </ProtectedRoute>
  }
/>
<Route
  path="/resume"
  element={
    <ProtectedRoute role="freelancer">
      <Resume />
    </ProtectedRoute>
  }
/>
        </Routes>
      </div>
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="colored"
/>
    </>
  );
}
<Footer />
export default App;