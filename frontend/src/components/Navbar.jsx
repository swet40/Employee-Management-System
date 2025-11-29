import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="navbar">
        <h3>Leave System</h3>

        <div className="nav-links">
            {user?.role === "employee" && (
            <>
                <Link className="nav-link" to="/employee/dashboard">Dashboard</Link>
                <Link className="nav-link" to="/employee/apply">Apply</Link>
                <Link className="nav-link" to="/employee/requests">My Requests</Link>
            </>
            )}

            {user?.role === "manager" && (
            <>
                <Link className="nav-link" to="/manager/dashboard">Dashboard</Link>
                <Link className="nav-link" to="/manager/pending">Pending</Link>
                <Link className="nav-link" to="/manager/all">All Requests</Link>
            </>
            )}

            <div
            className="logout-btn"
            onClick={() => {
                dispatch(logout());
                window.location.href = "/login";
            }}
            >
            Logout
            </div>
        </div>
        </div>
    );
}
