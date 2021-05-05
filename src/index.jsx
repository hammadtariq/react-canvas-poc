import React from "react";
import ReactDOM from "react-dom";
import { Provider as PositionProvider } from "./context/PositionContext";

import App from "./App";
import "./index.less";

ReactDOM.render(
  <React.StrictMode>
    <PositionProvider>
      <App />
    </PositionProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
