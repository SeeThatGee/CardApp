import { SingleCard } from "./SingleCard";
import "./CardGrid.css";

export const CardGrid = ({
  cards,
  handlePick,
  pickOne,
  pickTwo,
  delay,
  isEasy,
}) => {
  return (
    <div className={`card-grid ${isEasy ? "easy" : "hard"}`}>
      {cards.map((card) => (
        <SingleCard
          key={card.id}
          card={card}
          handlePick={handlePick}
          flipped={card === pickOne || card === pickTwo || card.matched}
          delay={delay}
        />
      ))}
    </div>
  );
};
