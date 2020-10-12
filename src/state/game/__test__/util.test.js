import {
  gameIsLoading,
  gameIsPlaying,
  gameIsOver,
  gameIsErrored,
  gameIsWon,
} from "../util";
import {
  GAME_STATUS_PLAYING,
  GAME_STATUS_LOADING,
  GAME_STATUS_OVER,
  GAME_STATUS_ERROR,
  GAME_STATUS_WON,
} from "../types";

test("Game state provers", () => {
  expect(gameIsLoading("bla")).not.toBe(GAME_STATUS_LOADING);
  expect(gameIsPlaying("bla")).not.toBe(GAME_STATUS_PLAYING);
  expect(gameIsOver("bla")).not.toBe(GAME_STATUS_OVER);
  expect(gameIsErrored("bla")).not.toBe(GAME_STATUS_ERROR);
  expect(gameIsWon("bla")).not.toBe(GAME_STATUS_WON);
});
