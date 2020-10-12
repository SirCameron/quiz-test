import { combineReducers } from "redux";
import { createReducer } from "../util";
import {
  GAME_STATUS_UPDATED,
  GAME_STATUS_LOADING,
  QUESTION_UPDATED,
  LEVEL_INCREASED,
  GAME_RESET,
} from "./types";

export default combineReducers({
  status: createReducer(
    {
      [GAME_STATUS_UPDATED]: (_, event) => event.status,
    },
    GAME_STATUS_LOADING
  ),
  level: createReducer(
    {
      [LEVEL_INCREASED]: (state) => state + 1,
      [GAME_RESET]: () => 1,
    },
    1
  ),
  score: createReducer(
    {
      [LEVEL_INCREASED]: (_, event) => event.newScore,
      [GAME_RESET]: () => 0,
    },
    0
  ),
  highscore: createReducer(
    {
      [LEVEL_INCREASED]: (state, event) =>
        event.newScore > state ? event.newScore : state,
    },
    0
  ),
  question: createReducer(
    {
      [QUESTION_UPDATED]: (_, event) => {
        return { ...event.question };
      },
    },
    null
  ),
  questionIds: createReducer(
    {
      [QUESTION_UPDATED]: (state, event) => {
        return [...state, event.question.id];
      },
    },
    []
  ),
});
