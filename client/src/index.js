import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./other/AppContext";
import GlobalStyle from "./other/GlobalStyle";
import { createRoot } from "react-dom/client";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <AppProvider>
        <GlobalStyle />
        <App />
      </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
