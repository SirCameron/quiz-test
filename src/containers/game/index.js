import React, { useEffect } from "react";
import { connect } from "react-redux";

import Game from "../../components/game";

import {
  getNextQuestion,
  checkAnswer,
  endGame,
  resetGame,
} from "../../state/game/actions";
import {
  selectQuestion,
  selectGameStatus,
  selectLevel,
  selectScore,
  selectHighscore,
} from "../../state/game/selectors";
import { gameIsLoading } from "../../state/game/util";

const GameContainer = ({
  gameStatus,
  question,
  level,
  score,
  highscore,
  getNextQuestion,
  checkAnswer,
  endGame,
  resetGame,
}) => {
  useEffect(() => {
    if (gameIsLoading(gameStatus)) {
      getNextQuestion();
    }
  }, [getNextQuestion, gameStatus]);

  return (
    <Game
      question={question}
      level={level}
      score={score}
      highscore={highscore}
      gameStatus={gameStatus}
      onAnswer={checkAnswer}
      onEnd={endGame}
      onReset={resetGame}
    />
  );
};

export default connect(
  (state) => ({
    question: selectQuestion(state),
    gameStatus: selectGameStatus(state),
    level: selectLevel(state),
    score: selectScore(state),
    highscore: selectHighscore(state),
  }),
  {
    getNextQuestion,
    checkAnswer,
    endGame,
    resetGame,
  }
)(GameContainer);
