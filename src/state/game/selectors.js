export function selectQuestion(state) {
  if (state.game.question) {
    return state.game.question;
  }
  return null;
}

export function selectGameStatus(state) {
  return state.game.status;
}

export function selectLevel(state) {
  return state.game.level;
}

export function selectScore(state) {
  return state.game.score;
}

export function selectHighscore(state) {
  return state.game.highscore;
}

export function selectQuestionIds(state) {
  return state.game.questionIds;
}
