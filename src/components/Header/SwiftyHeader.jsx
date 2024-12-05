import { DifficultyToggle } from "../DifficultlyToggle/DifficultyToggle";
import "./SwiftyHeader.css";

export const SwiftyHeader = ({
  rearrange,
  flipAll,
  time,
  guesses,
  isEasy,
  setIsEasy,
}) => {
  return (
    <header className="swifty-header">
      <h1>Swifty Game</h1>
      <DifficultyToggle isEasy={isEasy} setIsEasy={setIsEasy} />
      <div className="swifty-header-buttons">
        <button className="swifty-header-button" onClick={rearrange}>
          New Game
        </button>
        <button className="swifty-header-button" onClick={flipAll}>
          Flip All
        </button>
      </div>
      <div className="swifty-header-stats">
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
