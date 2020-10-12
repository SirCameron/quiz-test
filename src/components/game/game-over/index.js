import React from "react";
import PropTypes from "prop-types";

const GameOver = ({ onReset, answer }) => {
  return (
    <div className="game-over-container">
      Game over!
      <div className="correct-answer">
        The correct answer was:
        <div>{answer}</div>
      </div>
      <div>
        <button className="reset" type="button" onClick={onReset}>
          Start over
        </button>
      </div>
    </div>
  );
};

GameOver.propTypes = {
  onReset: PropTypes.func.isRequired,
  answer: PropTypes.string.isRequired,
};

export default GameOver;
