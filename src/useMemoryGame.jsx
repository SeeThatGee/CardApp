import { useState, useEffect } from "react";
import { shuffleCards } from "./utils";

const cardImages = [
  { src: "/img/horse-1.png", matched: false },
  { src: "/img/Widow.png", matched: false },
  { src: "/img/Halifax.png", matched: false },
  { src: "/img/AMC.png", matched: false },
  { src: "/img/Embark.png", matched: false },
  { src: "/img/BOS.png", matched: false },
];

const difficultImages = [
  { src: "/img/MBNA.png", matched: false },
  { src: "/img/IWEB.png", matched: false },
  { src: "/img/Tusker.png", matched: false },
];

export const useMemoryGame = (isEasy) => {
  const [cards, setCards] = useState([]);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [delay, setDelay] = useState(false);
  const [guesses, setGuesses] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const rearrange = () => {
    const images = isEasy ? cardImages : [...cardImages, ...difficultImages];
    const newOrder = shuffleCards([...images, ...images]);
    setPickOne(null);
    setPickTwo(null);
    setCards(newOrder);
    setGuesses(0);
    setGameWon(false);
    setTime(0);
    setIsActive(true);
  };

  const handlePick = (card) => {
    pickOne ? setPickTwo(card) : setPickOne(card);
  };

  const reset = () => {
    setPickOne(null);
    setPickTwo(null);
    setDelay(false);
  };

  const checkWin = () => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      console.log("All cards matched!");
      setGameWon(true);
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (pickOne && pickTwo) {
      setDelay(true);
      setGuesses((prevGuesses) => prevGuesses + 1);
      if (pickOne.src === pickTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === pickOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => {
          reset();
        }, 750);
      }
    }
  }, [pickOne, pickTwo]);

  useEffect(() => {
    rearrange();
  }, [isEasy]);

  useEffect(() => {
    checkWin();
  }, [cards]);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive, time]);

  const flipAll = () => {
    setCards((prevCards) =>
      prevCards.map((card) => ({ ...card, matched: true }))
    );
    setGameWon(true);
    setIsActive(false);
  };

  return {
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
  };
};
