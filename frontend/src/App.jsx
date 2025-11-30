import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/authSlice";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import MyRequests from "./pages/MyRequests";

import ManagerDashboard from "./pages/ManagerDashboard";
import PendingRequests from "./pages/PendingRequests";
import AllRequests from "./pages/AllRequests";

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(getMe());
  }, []);

  if (loading) return null;

  // Hide navbar on login/register pages
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {user && !hideNavbar && <Navbar />}

      <Routes>

        {/* ROOT REDIRECT */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "employee" ? (
                <Navigate to="/employee/dashboard" replace />
              ) : (
                <Navigate to="/manager/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/apply"
          element={
            <ProtectedRoute role="employee">
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/requests"
          element={
            <ProtectedRoute role="employee">
              <MyRequests />
            </ProtectedRoute>
          }
        />

        {/* Manager */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/pending"
          element={
            <ProtectedRoute role="manager">
              <PendingRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/all"
          element={
            <ProtectedRoute role="manager">
              <AllRequests />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
