import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(formData));

        if (result.payload?.user?.role === "employee") {
        navigate("/employee/dashboard");
        } else if (result.payload?.user?.role === "manager") {
        navigate("/manager/dashboard");
        }
    };

    return (
        <div className="login-container">

        <div className="login-card">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your account</p>

            {error && <p className="login-error">Invalid email or password</p>}

            <form onSubmit={handleSubmit} className="login-form">
            <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="login-input"
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="login-input"
                onChange={handleChange}
                required
            />

            <button type="submit" className="login-button">
                {loading ? "Logging in..." : "Login"}
            </button>
            </form>

            <p className="login-footer">
            Don’t have an account? <Link to="/register">Register</Link>
            </p>
        </div>
        </div>
    );
}
