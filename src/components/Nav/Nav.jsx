import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSwiftyGame, setIsSwiftyGame] = useState(
    location.pathname === "/swifty-game"
  );

  useEffect(() => {
    if (isSwiftyGame) {
      navigate("/swifty-game");
    } else {
      navigate("/");
    }
  }, [isSwiftyGame, navigate]);

  const handleToggle = () => {
    setIsSwiftyGame(!isSwiftyGame);
  };

  return (
    <nav className="nav">
      <input
        type="checkbox"
        id="nav-toggle"
        className="toggle-checkbox"
        checked={isSwiftyGame}
        onChange={handleToggle}
      />
      <label htmlFor="nav-toggle" className="toggle-label">
        <span className="toggle-inner"></span>
        <span className="toggle-switch">
          {isSwiftyGame && <span className="heart">💗</span>}
        </span>
      </label>
    </nav>
  );
};
