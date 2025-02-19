import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./utils/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router";
import AppRouter from "./AppRouter.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  </StrictMode>
);
