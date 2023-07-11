import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import { Amplify } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
