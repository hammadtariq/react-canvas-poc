import React from "react";
// import { QueryClient, QueryClientProvider } from "react-query";
import MainStage from "./components/MainStage";
import { Stage, Layer, Rect, Circle } from "react-konva";

import "./styles/App.less";

function App() {
  return (
    <MainStage
      onSelectSeat={(seatId) => {
        console.log("selected - " + seatId);
      }}
    />
  );
}

export default App;
