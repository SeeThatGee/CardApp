import { useEffect, useState } from "react";
import { useMemoryGame } from "../useMemoryGame";
import Modal from "react-modal";
import "./CardGame.css";
import { Header } from "../components/Header/Header";
import { CardGrid } from "../components/Cards/CardGrid";
import { Leaderboard } from "../components/Leaderboards/Leaderboard";
import { WinModal } from "../components/Modals/WinModal";

Modal.setAppElement("#root");

export const CardGame = ({ isEasy, setIsEasy }) => {
  const {
    cards,
    delay,
    guesses,
    gameWon,
    time,
    rearrange,
    handlePick,
    pickOne,
    pickTwo,
    flipAll,
    setGameWon,
  } = useMemoryGame(isEasy);

  useEffect(() => {
    document.body.classList.add("card-game");
    return () => {
      document.body.classList.remove("card-game");
    };
  }, []);

  const [refreshLeaderboard, setRefreshLeaderboard] = useState(false);

  const handleEntryAdded = () => {
    setGameWon(false); // Close the modal
    setRefreshLeaderboard((prev) => !prev); // Trigger leaderboard refresh
  };

  return (
    <div className="card-game">
      <Header
        rearrange={rearrange}
        flipAll={flipAll}
        time={time}
        guesses={guesses}
        isEasy={isEasy}
        setIsEasy={setIsEasy}
      />
      <CardGrid
        cards={cards}
        handlePick={handlePick}
        pickOne={pickOne}
        pickTwo={pickTwo}
        delay={delay}
        isEasy={isEasy}
      />
      <Leaderboard refresh={refreshLeaderboard} isEasy={isEasy} />
      <Modal
        isOpen={gameWon}
        onRequestClose={() => setGameWon(false)}
        contentLabel="Game Won"
        className="modal"
        overlayClassName="overlay"
      >
        <WinModal
          gameWon={gameWon}
          guesses={guesses}
          time={time}
          onEntryAdded={handleEntryAdded}
          rearrange={rearrange}
          isEasy={isEasy}
        />
      </Modal>
    </div>
  );
};
