import styles from "../EditGame/EditGame.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditGame = () => {
  const { gameId } = useParams();
  console.log("Game ID from URL:", gameId);
  const navigate = useNavigate();
  const [gameTitle, setGameTitle] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [likes, setLikes] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!gameId) {
      navigate("/Error404");
      return;
    }

    fetch(`http://localhost:3000/gamePosts/${gameId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Game not found");
        }
        return response.json();
      })
      .then((data) => {
        setGameTitle(data.gameTitle);
        setGameDescription(data.gameDescription);
        setLikes(data.likes);
      })
      .catch(() => navigate("/Error404"));
  }, [gameId, navigate]);

  const handleTitleChange = (e) => setGameTitle(e.target.value);
  const handleDescriptionChange = (e) => setGameDescription(e.target.value);

  const validateForm = () => {
    let formErrors = {};
    if (!gameTitle.trim()) formErrors.title = "Game title cannot be empty";
    if (!gameDescription.trim())
      formErrors.description = "Game description cannot be empty";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const updatedGame = {
      gameTitle,
      gameDescription,
      likes,
    };

    fetch(`http://localhost:3000/gamePosts/${gameId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGame),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update game");
        }
        return response.json();
      })
      .then(() => navigate("/Home"))
      .catch(() => navigate("/Error404"));
  };

  return (
    <div className={styles.wrapper}>
      <h1>Edit Game</h1>
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

        <button type="submit" className={styles.editGameButton}>
          Save Changes
        </button>
        <button
          type="button"
          className={styles.editGameButton}
          onClick={() => navigate("/Home")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditGame;
