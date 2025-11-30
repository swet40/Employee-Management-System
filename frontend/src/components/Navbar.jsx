import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import "../styles/navbar.css";

export default function Navbar() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar">
        <div className="navbar-title">Leave System</div>

        <div className="nav-links">
            {user?.role === "employee" && (
            <>
                <Link to="/employee/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/employee/apply" className="nav-link">Apply</Link>
                <Link to="/employee/requests" className="nav-link">My Requests</Link>
            </>
            )}

            {user?.role === "manager" && (
            <>
                <Link to="/manager/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/manager/pending" className="nav-link">Pending</Link>
                <Link to="/manager/all" className="nav-link">All Requests</Link>
            </>
            )}

            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        </nav>
    );
}
