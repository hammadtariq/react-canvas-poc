import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as PositionProvider } from "./context/PositionContext";
import { Provider as CategoryProvider } from "./context/CategoriesContext";
import { Provider as ToolbarContext } from "./context/ToolbarContext";

import App from "./App";
import "./index.less";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToolbarContext>
        <CategoryProvider>
          <PositionProvider>
            <App />
          </PositionProvider>
        </CategoryProvider>
      </ToolbarContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
