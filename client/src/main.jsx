import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Store from './Store.js'
import {Provider} from "react-redux"
import { BrowserRouter } from "react-router-dom";
import ContexProvider from "./Component/Contex/ContexProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ContexProvider>
  <Provider store={Store}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
  </ContexProvider>
);
