import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Store } from "./setup/store/store";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { PDFViewer } from "@react-pdf/renderer";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
  <App />
</Provider>
)
