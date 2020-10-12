import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { COUNTDOWN_TIME } from "../../../constants/game";

const Question = ({ question, category, onTimoeut, onSubmit }) => {
  const timer = useRef();
  const [answer, setAnswer] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const getTimeRemaining = () => {
    return Math.round(COUNTDOWN_TIME - (currentTime - startTime) / 1000);
  };

  useEffect(() => {
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    timer.current = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [question]);

  if (getTimeRemaining() <= 0) {
    onTimoeut && onTimoeut();
  }

  const handleTextChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.length) {
      onSubmit && onSubmit(answer);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="timer" data-testid="timer">
        {getTimeRemaining()}
      </div>
      <div className="category">{category}</div>
      <div className="question">{question}</div>
      <div className="input-container">
        <input
          data-testid="input"
          type="text"
          onChange={handleTextChange}
          autoFocus
        ></input>
        <button type="submit">OK</button>
      </div>
    </form>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onTimoeut: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Question;
