import React from "react";
import ReactDOM from "react-dom";
import { Provider as PositionProvider } from "./context/PositionContext";
import { Provider as CategoryProvider } from "./context/CategoriesContext";

import App from "./App";
import "./index.less";

ReactDOM.render(
  <React.StrictMode>
    <CategoryProvider>
      <PositionProvider>
        <App />
      </PositionProvider>
    </CategoryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
