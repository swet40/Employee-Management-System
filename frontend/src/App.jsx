import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/authSlice";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";   // <-- IMPORT NAVBAR

import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import MyRequests from "./pages/MyRequests";

import ManagerDashboard from "./pages/ManagerDashboard";
import PendingRequests from "./pages/PendingRequests";
import AllRequests from "./pages/AllRequests";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(getMe());
  }, []);

  return (
    <BrowserRouter>

      {/* 🟦 SHOW NAVBAR ONLY WHEN LOGGED IN */}
      {user && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee Routes */}
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

        {/* Manager Routes */}
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
    </BrowserRouter>
  );
}

export default App;
