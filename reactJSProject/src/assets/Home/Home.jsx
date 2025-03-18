import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Home/Home.module.css";
import { UserContext } from "../UserContext/UserContext";

const HomeForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);

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

  const handleEditGame = () => {
    navigate("/Edit");
  };

  const handleDeleteGame = async (gameId) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;

    try {
      await fetch(`http://localhost:3000/gamePosts/${gameId}`, {
        method: "DELETE",
      });

      setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
    } catch (error) {
      navigate("/Error404");
    }
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
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.gamesList}>
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className={styles.gameItem}>
              <div className={styles.topButtons}>
                <button onClick={handleEditGame}>Edit game</button>
                <button onClick={() => handleDeleteGame(game.id)}>
                  Delete game
                </button>
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
        <p>E-mail: 149ikz@unibit.bg</p>
      </div>
    </div>
  );
};

export default HomeForm;
