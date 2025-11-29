import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "employee",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(registerUser(formData));

        navigate("/login");
    };

    return (
        <div className="register-container">
        <div className="register-card">
            <h2 className="register-title">Create Account</h2>

            <form onSubmit={handleSubmit} className="register-form">

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="register-input"
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                className="register-input"
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                className="register-input"
                onChange={handleChange}
                required
            />

            <select
                name="role"
                className="register-select"
                onChange={handleChange}
            >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
            </select>

            <button type="submit" className="register-button">
                Register
            </button>
            </form>

            <p className="register-footer">
            Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
        </div>
    );
}
