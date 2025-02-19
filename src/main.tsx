import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/CSS/index.css";
import { Provider } from "react-redux";
import { store } from "./utils/store.ts";
import { BrowserRouter as Router } from "react-router";
import AppRouter from "./AppRouter.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  </StrictMode>
);
