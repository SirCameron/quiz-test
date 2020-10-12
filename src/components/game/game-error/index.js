import React from "react";
import PropTypes from "prop-types";

const GameError = ({ onReset }) => {
  return (
    <div className="error-container">
      Something went wrong!
      <div>
        <button className="reset" type="button" onClick={onReset}>
          Try again
        </button>
      </div>
    </div>
  );
};

GameError.propTypes = {
  onReset: PropTypes.func.isRequired,
};

export default GameError;
