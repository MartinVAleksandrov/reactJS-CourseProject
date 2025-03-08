import React from "react";
import styles from "../RegisterForm/RegisterForm.module.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Register</h1>
        <div className={styles.inputbox}>
          <input type="text" placeholder="First name" required />
        </div>
        <div className={styles.inputbox}>
          <input type="text" placeholder="Last name" required />
        </div>
        <div className={styles.inputbox}>
          <input type="password" placeholder="Password" required />
        </div>
        <div className={styles.inputbox}>
          <input type="password" placeholder="Confirm Password" required />
        </div>
        <Link to="/">
          <button type="submit">Register</button>
        </Link>
      </form>
    </div>
  );
};
export default RegisterForm;
