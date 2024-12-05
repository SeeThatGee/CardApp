import "./SingleCard.css";

export const SingleCard = ({ card, handlePick, flipped, delay }) => {
  const handleclick = () => {
    if (!delay) {
      handlePick(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          src={card.src}
          alt="card front"
          draggable="false"
        />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleclick}
          alt="card back"
          draggable="false"
        />
      </div>
    </div>
  );
};
