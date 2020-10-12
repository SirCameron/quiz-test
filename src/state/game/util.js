import {
  GAME_STATUS_PLAYING,
  GAME_STATUS_LOADING,
  GAME_STATUS_OVER,
  GAME_STATUS_ERROR,
  GAME_STATUS_WON,
} from "./types";

export const gameIsLoading = (status) => status === GAME_STATUS_LOADING;
export const gameIsPlaying = (status) => status === GAME_STATUS_PLAYING;
export const gameIsOver = (status) => status === GAME_STATUS_OVER;
export const gameIsErrored = (status) => status === GAME_STATUS_ERROR;
export const gameIsWon = (status) => status === GAME_STATUS_WON;
