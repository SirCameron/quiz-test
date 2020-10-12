import reducer from "../reducer";
import {
  GAME_STATUS_LOADING,
  GAME_STATUS_PLAYING,
  GAME_STATUS_OVER,
  GAME_STATUS_WON,
  GAME_STATUS_ERROR,
} from "../types";
import {
  emitGameStatusPlaying,
  emitGameStatusOver,
  emitGameStatusWon,
  emitGameStatusError,
  emitQuestionUpdate,
  emitLevelUp,
  emitReset,
  calculateScore,
} from "../actions";

let defaultState = null;

test("default state", () => {
  const state = reducer();
  defaultState = state;
  expect(state).toEqual({
    status: GAME_STATUS_LOADING,
    level: 1,
    score: 0,
    highscore: 0,
    question: null,
    questionIds: [],
  });
});

test("Game state - playing", () => {
  const state = reducer(defaultState, emitGameStatusPlaying());
  expect(state).toEqual({
    status: GAME_STATUS_PLAYING,
    level: 1,
    score: 0,
    highscore: 0,
    question: null,
    questionIds: [],
  });
});

test("Game state - over", () => {
  const state = reducer(defaultState, emitGameStatusOver());
  expect(state).toEqual({
    status: GAME_STATUS_OVER,
    level: 1,
    score: 0,
    highscore: 0,
    question: null,
    questionIds: [],
  });
});

test("Game state - won", () => {
  const state = reducer(defaultState, emitGameStatusWon());
  expect(state).toEqual({
    status: GAME_STATUS_WON,
    level: 1,
    score: 0,
    highscore: 0,
    question: null,
    questionIds: [],
  });
});

test("Game state - error", () => {
  const state = reducer(defaultState, emitGameStatusError());
  expect(state).toEqual({
    status: GAME_STATUS_ERROR,
    level: 1,
    score: 0,
    highscore: 0,
    question: null,
    questionIds: [],
  });
});

test("Question and seen ids update", () => {
  const state = reducer(defaultState, emitQuestionUpdate({ id: 123 }));
  expect(state.question).toEqual({ id: 123 });
  expect(state.questionIds).toEqual([123]);
});

test("User levels up", () => {
  const state = reducer(defaultState, emitLevelUp(2, 2));
  expect(state.highscore).toBe(2);
  expect(state.level).toBe(2);
  expect(state.score).toBe(2);
});

test("Game resets", () => {
  const testState = { ...defaultState, score: 123, level: 23 };
  const state = reducer(testState, emitReset());
  expect(state.level).toBe(1);
  expect(state.score).toBe(0);
});

test("Score calculates correctly", () => {
  expect(calculateScore(4)).toBe(8);
});
