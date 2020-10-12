import {
  selectQuestion,
  selectGameStatus,
  selectLevel,
  selectScore,
  selectQuestionIds,
  selectHighscore,
} from "../selectors";
import { GAME_STATUS_LOADING } from "../types";
import rootReducer from "../../reducer";

const initialState = rootReducer(undefined);

test("Selectors", () => {
  expect(selectQuestion(initialState)).toBe(null);
  expect(selectGameStatus(initialState)).toBe(GAME_STATUS_LOADING);
  expect(selectLevel(initialState)).toBe(1);
  expect(selectScore(initialState)).toBe(0);
  expect(selectQuestionIds(initialState)).toEqual([]);
  expect(selectHighscore(initialState)).toBe(0);
});
