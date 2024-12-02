import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../FireBase/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


const Login = () => {

    const provider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        login();
    };


    const loginWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success(`Welcome back, ${user.displayName || user.email}`);
            if (result.user) { navigate("/form") }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    };
    
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
    
            console.log("User Info:", user);
            alert(`Welcome, ${user.displayName}`);
            if (result.user) { navigate("/form") }
        } catch (error) {
            console.error("Google Login Error:", error.message);
        }
    };

    const login = async () => {
        try {
            const res = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            toast.success("Login successful! Welcome, " + res.user.email);
            console.log(res.user);
            if (res.user) { navigate("/form") }
        } catch (error) {
            toast.error("Login failed: " + error.message);
            console.log(error.message);
        }
    };

    return (
        <div className="container mt-5 bg-dark text-light p-5 rounded" style={{ width: "500px" }}>
            <h2 className="mb-4 text-center">SignIn Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-start fw-medium fs-5 d-block">
                        Your Email
                    </label>
                    <input
                        type="email"
                        className="form-control bg-secondary text-light"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-start fw-medium fs-5 d-block">
                        Your Password
                    </label>
                    <input
                        type="password"
                        className="form-control bg-secondary text-light"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="d-flex justify-content-evenly mb-3">
                    <button className="bg-transparent border rounded-4 d-flex align-items-center" onClick={loginWithGoogle}><FcGoogle size={22} /> oogle</button>
                    <button className="bg-transparent border rounded-4 d-flex align-items-center" onClick={loginWithGitHub}><FaGithub size={22} /> &nbsp;GitHub</button>
                </div>
                <span className="d-block">Don't have an account? <Link to="/signUp">SignUp</Link></span>
                <button type="submit" className="btn mt-3 w-100 btn-primary">
                    SignIn
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
