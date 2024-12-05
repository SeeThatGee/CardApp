import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./SwiftyGame.css";
import { SwiftyModal } from "../components/Modals/SwiftyModal";
import { Swiftyboard } from "../components/Leaderboards/Swiftyboard";
import { AlbumsGrid } from "../components/AlbumCovers/AlbumGrid";
import { useSwiftyGame } from "../useSwiftyGame";
import { SwiftyHeader } from "../components/Header/SwiftyHeader";

Modal.setAppElement("#root");

export const SwiftyGame = ({ isEasy, setIsEasy }) => {
  const {
    albums,
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
  } = useSwiftyGame(isEasy);

  useEffect(() => {
    document.body.classList.add("swifty-game");
    return () => {
      document.body.classList.remove("swifty-game");
    };
  }, []);

  const [refreshSwiftyboard, setRefreshSwiftyboard] = useState(false);

  const handleEntryAdded = () => {
    setGameWon(false);
    setRefreshSwiftyboard((prev) => !prev);
  };

  return (
    <div className="swifty-game">
      <SwiftyHeader
        rearrange={rearrange}
        flipAll={flipAll}
        time={time}
        guesses={guesses}
        isEasy={isEasy}
        setIsEasy={setIsEasy}
      />
      <AlbumsGrid
        albums={albums}
        handlePick={handlePick}
        pickOne={pickOne}
        pickTwo={pickTwo}
        delay={delay}
        isEasy={isEasy}
      />
      <Swiftyboard refresh={refreshSwiftyboard} isEasy={isEasy} />
      <Modal
        isOpen={gameWon}
        onRequestClose={() => setGameWon(false)}
        contentLabel="Game Won"
        className="modal"
        overlayClassName="overlay"
      >
        <SwiftyModal
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
