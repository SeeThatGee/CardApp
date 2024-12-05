import "./DifficultyToggle.css";

export const DifficultyToggle = ({ isEasy, setIsEasy }) => {
  const handleDifficultyToggle = () => {
    setIsEasy(!isEasy);
    console.log("Difficulty toggled!");
  };

  return (
    <>
      <input
        type="checkbox"
        id="difficulty-toggle"
        className="difficulty-toggle-checkbox"
        checked={!isEasy}
        onChange={handleDifficultyToggle}
      />
      <label htmlFor="difficulty-toggle" className="difficulty-toggle-label">
        <span className="difficulty-toggle-inner"></span>
        <span className="difficulty-toggle-switch">
          {!isEasy && <span className="fire">🔥</span>}
        </span>
      </label>
    </>
  );
};
