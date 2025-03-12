import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../LoginForm/LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [dbdata, setdbdata] = useState();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch("http://localhost:3000/registeredUsers")
        .then((dbresult) => {
          return dbresult.json();
        })
        .then((res) => {
          setdbdata(res);
        });
      let user = dbdata.find((x) => x.email === email);
      if (!user) {
        errors.email = "User not found!";
        setErrors(errors);
      }

      if (user.password === password) {
        navigate("/");
      } else {
        errors.password = "Password is invalid";
        setErrors(errors);
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

        <div className={styles.registerlink}>
          <p>
            Don't have an account? <Link to="/RegisterForm">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
