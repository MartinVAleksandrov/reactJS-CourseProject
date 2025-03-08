import React from "react";
import styles from "../LoginForm/LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Login</h1>
        <div className={styles.inputbox}>
          <input type="text" placeholder="Username" required />
        </div>
        <div className={styles.inputbox}>
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
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
