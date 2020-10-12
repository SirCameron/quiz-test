import React from "react";
import PropTypes from "prop-types";

import "./game.css";
import Question from "./question";
import GameLoading from "./loading";
import GameOver from "./game-over";
import GameWon from "./game-won";
import GameError from "./game-error";

import {
  gameIsPlaying,
  gameIsLoading,
  gameIsOver,
  gameIsErrored,
  gameIsWon,
} from "../../state/game/util";

const Game = ({
  gameStatus,
  question,
  level,
  score,
  highscore,
  onAnswer,
  onEnd,
  onReset,
}) => {
  const renderGameState = () => {
    if (gameIsLoading(gameStatus)) {
      return <GameLoading />;
    } else if (gameIsOver(gameStatus)) {
      return <GameOver onReset={onReset} answer={question.answer} />;
    } else if (gameIsErrored(gameStatus)) {
      return <GameError onReset={onReset} />;
    } else if (gameIsWon(gameStatus)) {
      return <GameWon onReset={onReset} />;
    } else if (gameIsPlaying(gameStatus)) {
      return (
        <Question
          question={question.question}
          category={question.category.title}
          onTimoeut={onEnd}
          onSubmit={onAnswer}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="game-container">
      <div className="game-console-container">
        <div className="stats-container">
          <div className="level">level: {level}</div>
          <div className="score">score: {score}</div>
          <div className="highscore">highscore: {highscore}</div>
        </div>
        <div>{renderGameState()}</div>
      </div>
    </div>
  );
};

Game.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  highscore: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Game;
