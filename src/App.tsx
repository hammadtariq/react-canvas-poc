import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Stage, Layer, Rect, Circle } from "react-konva";

import "./styles/App.less";

const queryClient = new QueryClient();

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <h1 className="App-header">Venue</h1>
      <div className="App-body">
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Rect width={50} height={50} fill="yellow" />
            <Circle x={200} y={200} stroke="black" radius={50} />
          </Layer>
        </Stage>
      </div>
    </div>
  </QueryClientProvider>
);

export default App;
