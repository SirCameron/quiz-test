import React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import Game from "../index";
import {
  GAME_STATUS_LOADING,
  GAME_STATUS_OVER,
  GAME_STATUS_ERROR,
  GAME_STATUS_WON,
  GAME_STATUS_PLAYING,
} from "../../../state/game/types";

const question = {
  question: "question",
  category: { title: "category" },
  answer: "Hucklerberry",
};

test("Renders loading...", () => {
  const { getByText } = render(
    <Game
      gameStatus={GAME_STATUS_LOADING}
      question={question}
      level={1}
      score={123}
      highscore={1212}
      onAnswer={() => {}}
      onEnd={() => {}}
      onReset={() => {}}
    />
  );
  const element = getByText(/loading.../i);
  expect(element).toBeInTheDocument();
});

test("Renders reset/game over", () => {
  const onReset = jest.fn();

  const { getByText } = render(
    <Game
      gameStatus={GAME_STATUS_OVER}
      question={question}
      level={1}
      score={123}
      highscore={1212}
      onAnswer={() => {}}
      onEnd={() => {}}
      onReset={onReset}
    />
  );
  const element = getByText(/Game over/i);
  expect(element).toBeInTheDocument();
  const answerTitleElement = getByText(/The correct answer was:/i);
  expect(answerTitleElement).toBeInTheDocument();
  const answerElement = getByText(/Hucklerberry/i);
  expect(answerElement).toBeInTheDocument();
  fireEvent.click(getByText(/Start over/));
  expect(onReset).toHaveBeenCalled();
});

test("Renders error", () => {
  const onReset = jest.fn();

  const { getByText } = render(
    <Game
      gameStatus={GAME_STATUS_ERROR}
      question={question}
      level={1}
      score={123}
      highscore={1212}
      onAnswer={() => {}}
      onEnd={() => {}}
      onReset={onReset}
    />
  );
  const element = getByText(/Something went wrong!/i);
  expect(element).toBeInTheDocument();
  fireEvent.click(getByText(/Try again/));
  expect(onReset).toHaveBeenCalled();
});

test("Renders game won", () => {
  const onReset = jest.fn();

  const { getByText } = render(
    <Game
      gameStatus={GAME_STATUS_WON}
      question={question}
      level={1}
      score={123}
      highscore={1212}
      onAnswer={() => {}}
      onEnd={() => {}}
      onReset={onReset}
    />
  );
  const element = getByText(/You won!/i);
  expect(element).toBeInTheDocument();
  fireEvent.click(getByText(/Start over/));
  expect(onReset).toHaveBeenCalled();
});

test("Renders question", () => {
  const onAnswer = jest.fn();

  const { getByText, getByTestId } = render(
    <Game
      gameStatus={GAME_STATUS_PLAYING}
      question={question}
      level={1}
      score={123}
      highscore={1212}
      onAnswer={onAnswer}
      onEnd={() => {}}
      onReset={() => {}}
    />
  );
  const questionElement = getByText(/question/i);
  expect(questionElement).toBeInTheDocument();
  const categoryElement = getByText(/category/i);
  expect(categoryElement).toBeInTheDocument();

  const input = getByTestId("input");
  fireEvent.change(input, { target: { value: "bla bla" } });
  const submit = getByText("OK");
  fireEvent.click(submit);
  expect(onAnswer).toHaveBeenCalledWith("bla bla");
});
