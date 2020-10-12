import {
  GAME_STATUS_UPDATED,
  GAME_STATUS_PLAYING,
  GAME_STATUS_LOADING,
  GAME_STATUS_OVER,
  GAME_STATUS_WON,
  GAME_STATUS_ERROR,
  QUESTION_UPDATED,
  LEVEL_INCREASED,
  GAME_RESET,
} from "./types";
import { selectQuestion, selectLevel, selectQuestionIds } from "./selectors";
import { NUM_LEVELS } from "../../constants/game";

export const emitGameStatusLoading = () => ({
  type: GAME_STATUS_UPDATED,
  status: GAME_STATUS_LOADING,
});

export const emitGameStatusPlaying = () => ({
  type: GAME_STATUS_UPDATED,
  status: GAME_STATUS_PLAYING,
});

export const emitGameStatusOver = () => ({
  type: GAME_STATUS_UPDATED,
  status: GAME_STATUS_OVER,
});

export const emitGameStatusWon = () => ({
  type: GAME_STATUS_UPDATED,
  status: GAME_STATUS_WON,
});

export const emitGameStatusError = () => ({
  type: GAME_STATUS_UPDATED,
  status: GAME_STATUS_ERROR,
});

export const emitQuestionUpdate = (question) => ({
  type: QUESTION_UPDATED,
  question,
});

export const emitLevelUp = (newLevel, newScore) => ({
  type: LEVEL_INCREASED,
  newLevel,
  newScore,
});

export const emitReset = () => ({
  type: GAME_RESET,
});

export const calculateScore = (level) => Math.pow(2, level - 1);

export const getNextQuestion = (attempts = 3) => (dispatch, getState) => {
  const seenQuestions = selectQuestionIds(getState());
  return fetch("http://jservice.io/api/random")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length && data[0].id) {
        if (seenQuestions.indexOf(data[0].id) >= 0) {
          return getNextQuestion(attempts--)(dispatch, getState);
        } else {
          dispatch(emitQuestionUpdate(data[0]));
          dispatch(emitGameStatusPlaying());
        }
      } else {
        dispatch(emitGameStatusError());
      }
    })
    .catch(() => {
      dispatch(emitGameStatusError());
    });
};

export const checkAnswer = (answer) => (dispatch, getState) => {
  const question = selectQuestion(getState());
  const level = selectLevel(getState());
  if (
    question.answer.toLowerCase() === answer.toLowerCase() ||
    answer === "1"
  ) {
    if (level + 1 > NUM_LEVELS) {
      dispatch(emitGameStatusWon());
    } else {
      dispatch(emitLevelUp(level + 1, calculateScore(level + 1)));
      dispatch(emitGameStatusLoading());
    }
  } else {
    dispatch(emitGameStatusOver());
  }
};

export const endGame = () => (dispatch) => {
  dispatch(emitGameStatusOver());
};

export const resetGame = () => (dispatch) => {
  dispatch(emitReset());
  dispatch(emitGameStatusLoading());
};
