import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Error404/Error404.module.css";

const Error404 = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/");
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <h1>Error 404</h1>
        <br />
        <button>Back to log in</button>
      </form>
    </div>
  );
};

export default Error404;
