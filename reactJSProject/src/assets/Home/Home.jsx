import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Home/Home.module.css";
//import { UserContext } from "../context/UserContext";

const HomeForm = () => {
  const navigate = useNavigate();
  //const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/gamePosts")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    navigate("/");
  };

  const handleAddGame = () => {
    navigate("/add-game");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Popular games</h1>
        <p>Welcome, Guest!</p>
        <button onClick={handleAddGame}>Add new game</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.gamesList}>
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className={styles.gameItem}>
              <button>Edit game</button>
              <button>Delete game</button>
              <h3>{game.gameTitle}</h3>
              <p>{game.gameDescription}</p>

              <button>
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
        <p>149ikz@unibit.bg</p>
      </div>
    </div>
  );
};

export default HomeForm;
