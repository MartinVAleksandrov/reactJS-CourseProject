import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Home/Home.module.css";
import { UserContext } from "../UserContext/UserContext";

const HomeForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/gamePosts")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => navigate("/Error404"));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleAddGame = () => {
    navigate("/AddGame");
  };

  const handleRegisteredUsers = () => {
    navigate("/AddGame");
  };

  const handleEditGame = (gameId) => {
    navigate(`/Edit/${gameId}`);
  };

  const handleDeleteGame = async () => {
    if (!selectedGame) return;

    try {
      await fetch(`http://localhost:3000/gamePosts/${selectedGame.id}`, {
        method: "DELETE",
      });

      setGames((prevGames) =>
        prevGames.filter((game) => game.id !== selectedGame.id)
      );
      closeModal();
    } catch (error) {
      navigate("/Error404");
    }
  };

  const openModal = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGame(null);
  };

  const handleLike = async (gameId) => {
    const updatedGames = games.map((game) =>
      game.id === gameId ? { ...game, likes: game.likes + 1 } : game
    );
    setGames(updatedGames);

    try {
      await fetch(`http://localhost:3000/gamePosts/${gameId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          likes: updatedGames.find((g) => g.id === gameId).likes,
        }),
      });
    } catch (error) {
      navigate("/Error404");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Popular games</h1>
        <p>Welcome, {user ? user : "User"}!</p>
        <button onClick={handleAddGame}>Add new game</button>
        <button onClick={handleRegisteredUsers}>Registered users</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.gamesList}>
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className={styles.gameItem}>
              <div className={styles.topButtons}>
                <button onClick={() => handleEditGame(game.id)}>
                  Edit game
                </button>
                <button onClick={() => openModal(game)}>Delete game</button>
              </div>
              <h3>{game.gameTitle}</h3>
              <p>{game.gameDescription}</p>

              <button
                className={styles.bottomButton}
                onClick={() => handleLike(game.id)}
              >
                <img src="../../../public/like.svg" alt="like" />
                {game.likes}
              </button>
            </div>
          ))
        ) : (
          <p>No games available.</p>
        )}
      </div>

      <div className={styles.footer}>
        <p>Martin Valentinov Aleksandrov &copy;</p>
        <p>Faculty №: 149ikz</p>
        <p>
          E-mail: <a href="mailto:149ikz@unibit.bg">149ikz@unibit.bg</a>
        </p>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Are you sure you want to delete "{selectedGame?.gameTitle}"?</p>
            <div className={styles.modalButtons}>
              <button className={styles.btnDelete} onClick={handleDeleteGame}>
                Yes, Delete
              </button>
              <button className={styles.btnCancel} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeForm;
