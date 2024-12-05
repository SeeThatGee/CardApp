import { DifficultyToggle } from "../DifficultlyToggle/DifficultyToggle";
import "./Header.css";

export const Header = ({
  rearrange,
  flipAll,
  time,
  guesses,
  isEasy,
  setIsEasy,
}) => {
  return (
    <header className="header">
      <h1>Memory Game</h1>
      <DifficultyToggle isEasy={isEasy} setIsEasy={setIsEasy} />
      <div className="header-buttons">
        <button className="header-button" onClick={rearrange}>
          New Game
        </button>
        <button className="header-button" onClick={flipAll}>
          Flip All
        </button>
      </div>
      <div className="header-stats">
        <p>
          Guesses<span>{guesses}</span>
        </p>
        <p>
          Time<span>{time}</span>seconds
        </p>
      </div>
    </header>
  );
};
