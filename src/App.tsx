import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Calculator from "./components/Calculator";
import "./styles/App.less";

const queryClient = new QueryClient();

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <h1 className="App-header">Calculator</h1>
      <div className="App-body">
        <Calculator />
      </div>
    </div>
  </QueryClientProvider>
);

export default App;
