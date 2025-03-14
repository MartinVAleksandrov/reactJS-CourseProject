import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../LoginForm/LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/registeredUsers");
        if (!response.ok) throw new Error("Failed to fetch users");

        const users = await response.json();
        const user = users.find((x) => x.email === email);

        if (!user) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "User not found!",
          }));
          return;
        }

        if (user.password !== password) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Password is invalid",
          }));
          return;
        }

        navigate("/Home");
      } catch (error) {
        navigate("/Error404");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <form>
        <h1>Login</h1>

        <div className={styles.inputbox}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles.errorLabel}>{errors.email || ""}</label>
        </div>
        <br />

        <div className={styles.inputbox}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={styles.errorLabel}>{errors.password || ""}</label>
        </div>
        <br />
        <br />
        <button onClick={handleSubmit}>Login</button>

        <div className={styles.loginlink}>
          <p>
            Don't have an account? <Link to="/RegisterForm">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
