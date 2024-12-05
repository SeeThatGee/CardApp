import { useState, useEffect } from "react";
import { shuffleAlbums } from "./utils";

const albumImages = [
  { src: "img/RedLyric.png", album: "Red", matched: false },
  { src: "img/Red.png", album: "Red", matched: false },
  { src: "img/Reputation.png", album: "Reputation", matched: false },
  { src: "img/ReputationLyric.png", album: "Reputation", matched: false },
  { src: "img/Lover.png", album: "Lover", matched: false },
  { src: "img/LoverLyric.png", album: "Lover", matched: false },
  { src: "img/Evermore.png", album: "Evermore", matched: false },
  { src: "img/EvermoreLyric.png", album: "Evermore", matched: false },
  { src: "img/Midnights.png", album: "Midnights", matched: false },
  { src: "img/MidnightsLyrics.png", album: "Midnights", matched: false },
  { src: "img/TTPD.png", album: "TTPD", matched: false },
  { src: "img/TTPDLyric.png", album: "TTPD", matched: false },
];

const difficultAlbums = [
  { src: "img/SpeakNow.png", album: "Speak Now", matched: false },
  { src: "img/SpeakNowLyric.png", album: "Speak Now", matched: false },
  { src: "img/1989.png", album: "1989", matched: false },
  { src: "img/1989Lyric.png", album: "1989", matched: false },
  { src: "img/Fearless.png", album: "Fearless", matched: false },
  { src: "img/FearlessLyric.png", album: "Fearless", matched: false },
];

export const useSwiftyGame = (isEasy) => {
  const [albums, setAlbums] = useState([]);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [delay, setDelay] = useState(false);
  const [guesses, setGuesses] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const rearrange = () => {
    const newOrder = isEasy
      ? shuffleAlbums([...albumImages])
      : shuffleAlbums([...albumImages, ...difficultAlbums]);
    setPickOne(null);
    setPickTwo(null);
    setAlbums(newOrder);
    setGuesses(0);
    setGameWon(false);
    setTime(0);
    setIsActive(true);
  };

  const handlePick = (album) => {
    pickOne ? setPickTwo(album) : setPickOne(album);
  };

  const reset = () => {
    setPickOne(null);
    setPickTwo(null);
    setDelay(false);
  };

  const checkWin = () => {
    if (albums.length > 0 && albums.every((album) => album.matched)) {
      console.log("All albums matched!");
      setGameWon(true);
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (pickOne && pickTwo) {
      setDelay(true);
      setGuesses((prevGuesses) => prevGuesses + 1);
      if (pickOne.album === pickTwo.album) {
        setAlbums((prevAlbums) => {
          return prevAlbums.map((album) => {
            if (album.album === pickOne.album) {
              return { ...album, matched: true };
            } else {
              return album;
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

  const flipAll = () => {
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) => ({ ...album, matched: true }))
    );
    setGameWon(true);
    setIsActive(false);
  };

  useEffect(() => {
    rearrange();
  }, [isEasy]);

  useEffect(() => {
    checkWin();
  }, [albums]);

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

  return {
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
  };
};
