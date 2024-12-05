import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CardGame } from "./Pages/CardGame";
import { SwiftyGame } from "./Pages/SwiftyGame";
import { Nav } from "./components/Nav/Nav";
import "./App.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const App = () => {
  const [isEasy, setIsEasy] = useState(true);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<CardGame isEasy={isEasy} setIsEasy={setIsEasy} />}
          />
          <Route
            path="/swifty-game"
            element={<SwiftyGame isEasy={isEasy} setIsEasy={setIsEasy} />}
          />
        </Routes>
      </div>
    </Router>
  );
};
