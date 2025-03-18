import styles from "../AddGame/AddGame.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddGame = () => {
  const navigate = useNavigate();
  const [gameTitle, setGameTitle] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [likes, setLikes] = useState(0);
  const [errors, setErrors] = useState({});

  const handleTitleChange = (e) => setGameTitle(e.target.value);
  const handleDescriptionChange = (e) => setGameDescription(e.target.value);

  const validateForm = async () => {
    let formErrors = {};

    if (!gameTitle.trim()) {
      formErrors.title = "Game title cannot be empty";
    }

    if (!gameDescription.trim()) {
      formErrors.description = "Game description cannot be empty";
    }

    const response = await fetch("http://localhost:3000/gamePosts");
    const games = await response.json();

    const isTitleTaken = games.some(
      (game) => game.gameTitle.toLowerCase() === gameTitle.trim().toLowerCase()
    );
    const isDescriptionTaken = games.some(
      (game) =>
        game.gameDescription.toLowerCase() ===
        gameDescription.trim().toLowerCase()
    );

    if (isTitleTaken) {
      formErrors.title = "This game title already exists";
    }

    if (isDescriptionTaken) {
      formErrors.description = "This game description already exists";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = await validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const newGame = {
      gameTitle,
      gameDescription,
      likes: likes,
    };

    fetch("http://localhost:3000/gamePosts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame),
    })
      .then((response) => response.json())
      .then(() => navigate("/Home"))
      .catch(() => navigate("/Error404"));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Add a New Game</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputbox}>
          <label htmlFor="gameTitle">Game Title:</label>
          <input
            type="text"
            id="gameTitle"
            value={gameTitle}
            onChange={handleTitleChange}
          />
          <label className={styles.errorLabel}>{errors.title || ""}</label>
        </div>

        <div className={styles.inputbox}>
          <label htmlFor="gameDescription">Game Description:</label>
          <textarea
            id="gameDescription"
            value={gameDescription}
            onChange={handleDescriptionChange}
          />
          <label className={styles.errorLabel}>
            {errors.description || ""}
          </label>
        </div>

        <input type="hidden" value={likes} />

        <button type="submit" className={styles.addGameButton}>
          Add Game
        </button>
        <button
          className={styles.addGameButton}
          onClick={() => navigate("/Home")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddGame;
