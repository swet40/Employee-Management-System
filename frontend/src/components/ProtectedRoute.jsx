import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
    const { user } = useSelector((state) => state.auth);


    if (!user) return <Navigate to="/login" replace />;

    // If user has wrong role, redirect to login
    if (role && user.role !== role) {
        return <Navigate to="/login" replace />;
    }

    //  If user and role match, show the protected page
    return children;
}
