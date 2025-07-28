import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/stylesheets/App.css";
import "./assets/stylesheets/cards.css";
import "./assets/stylesheets/colors.css";
import "./assets/stylesheets/buttons.css";
import "./assets/stylesheets/borders.css";
import "./assets/stylesheets/font.css";
import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
