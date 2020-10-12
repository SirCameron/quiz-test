import { getNextQuestion, checkAnswer, endGame, resetGame } from "../actions";
import {
  GAME_STATUS_UPDATED,
  GAME_STATUS_PLAYING,
  GAME_STATUS_ERROR,
  GAME_STATUS_LOADING,
  GAME_STATUS_OVER,
  GAME_STATUS_WON,
  GAME_RESET,
  LEVEL_INCREASED,
  QUESTION_UPDATED,
} from "../types";

global.fetch = jest.fn();

test("Gets next question - success once", async () => {
  const question = { id: 1 };
  global.fetch.mockReset();
  global.fetch.mockReturnValueOnce(
    Promise.resolve({
      json: () => Promise.resolve([question]),
    })
  );

  const dispatch = jest.fn();
  const getState = jest.fn(() => ({ game: { questionIds: [] } }));

  await getNextQuestion()(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({
    question: question,
    type: QUESTION_UPDATED,
  });
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_PLAYING,
    type: GAME_STATUS_UPDATED,
  });
});

test("Gets next question - success 2 attempts", async () => {
  const question1 = { id: 1 };
  const question2 = { id: 2 };
  global.fetch.mockReset();
  global.fetch
    .mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve([question1]),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve([question2]),
      })
    );

  const dispatch = jest.fn();
  const getState = jest.fn(() => ({ game: { questionIds: [1] } }));

  await getNextQuestion()(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({
    question: question2,
    type: QUESTION_UPDATED,
  });
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_PLAYING,
    type: GAME_STATUS_UPDATED,
  });
});

test("Gets next question - success 3 attempts fail", async () => {
  const question1 = { id: 1 };
  const question2 = { id: 2 };
  const question3 = { id: 3 };
  global.fetch.mockReset();
  global.fetch
    .mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve([question1]),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve([question2]),
      })
    )
    .mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve([question3]),
      })
    );

  const dispatch = jest.fn();
  const getState = jest.fn(() => ({ game: { questionIds: [1, 2, 3] } }));

  await getNextQuestion()(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_ERROR,
    type: GAME_STATUS_UPDATED,
  });
});

test("Gets next question - fetch failure", async () => {
  global.fetch.mockReset();
  global.fetch.mockReturnValueOnce(Promise.reject());

  const dispatch = jest.fn();
  const getState = jest.fn(() => ({ game: { questionIds: [1, 2, 3] } }));

  await getNextQuestion()(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_ERROR,
    type: GAME_STATUS_UPDATED,
  });
});

test("Gets next question - fetch failure, bad response", async () => {
  global.fetch.mockReset();
  global.fetch.mockReturnValueOnce(Promise.resolve([{ bla: 2 }]));

  const dispatch = jest.fn();
  const getState = jest.fn(() => ({ game: { questionIds: [] } }));

  await getNextQuestion()(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_ERROR,
    type: GAME_STATUS_UPDATED,
  });
});

test("Check answer - correct", () => {
  const dispatch = jest.fn();
  const getState = jest.fn(() => ({
    game: { question: { answer: "hello" }, level: 1 },
  }));

  checkAnswer("hello")(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({
    newScore: 2,
    newLevel: 2,
    type: LEVEL_INCREASED,
  });
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_LOADING,
    type: GAME_STATUS_UPDATED,
  });
});

test("Check answer - incorrect", () => {
  const dispatch = jest.fn();
  const getState = jest.fn(() => ({
    game: { question: { answer: "hello" }, level: 1 },
  }));

  checkAnswer("goodbye")(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_OVER,
    type: GAME_STATUS_UPDATED,
  });
});

test("Check answer - won", () => {
  const dispatch = jest.fn();
  const getState = jest.fn(() => ({
    game: { question: { answer: "hello" }, level: 30 },
  }));

  checkAnswer("hello")(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_WON,
    type: GAME_STATUS_UPDATED,
  });
});

test("Game ends", () => {
  const dispatch = jest.fn();

  endGame()(dispatch);
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_OVER,
    type: GAME_STATUS_UPDATED,
  });
});

test("Game resets", () => {
  const dispatch = jest.fn();

  resetGame()(dispatch);
  expect(dispatch).toHaveBeenCalledWith({
    type: GAME_RESET,
  });
  expect(dispatch).toHaveBeenCalledWith({
    status: GAME_STATUS_LOADING,
    type: GAME_STATUS_UPDATED,
  });
});
