import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../RegisterForm/RegisterForm.module.css";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }

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

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/registeredUsers");
        const users = await response.json();

        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email is already in use",
          }));
          return;
        }

        const newUser = { firstName, lastName, email, password };
        await fetch("http://localhost:3000/registeredUsers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        console.log("Registration successful", newUser);
        navigate("/");
      } catch (error) {
        navigate("/Error404");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className={styles.inputbox}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className={styles.errorLabel}>{errors.firstName || ""}</label>
        </div>
        <br />

        <div className={styles.inputbox}>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className={styles.errorLabel}>{errors.lastName || ""}</label>
        </div>
        <br />

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

        <div className={styles.inputbox}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label className={styles.errorLabel}>
            {errors.confirmPassword || ""}
          </label>
        </div>
        <br />
        <br />

        <button>Register</button>
      </form>
      <div className={styles.registerlink}>
        <p>
          Alredy have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
