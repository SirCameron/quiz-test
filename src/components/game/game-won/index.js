import React from "react";
import PropTypes from "prop-types";

const GameWon = ({ onReset }) => {
  return (
    <div className="you-won-container">
      You won!
      <div className="button-container">
        <button type="button" className="reset" onClick={onReset}>
          Start over
        </button>
      </div>
    </div>
  );
};

GameWon.propTypes = {
  onReset: PropTypes.func.isRequired,
};

export default GameWon;
