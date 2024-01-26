import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bestTime, setBestTime] = useState(null);
  const [previousTime, setPreviousTime] = useState(null);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  //show timer on start
  //NO timer on end
  //timerstop on end
  //prev time on end
  //best time on end
  //lower wins, check init or if time less than best render time otherwise best

  function gameEnd() {
    timerStop();
    timerReset();
    setBestTime(bestTime === null || time < bestTime ? time : bestTime);
    setPreviousTime(time);
  }

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time={time}
        previousTime={previousTime}
        bestTime={bestTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart={timerStart}
        onGameEnd={gameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}
