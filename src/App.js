import React from "react";
import { Provider } from "react-redux";

import "./App.css";
import { store } from "./state/store";
import Game from "./containers/game";

function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;
