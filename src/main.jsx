// main.jsx
// Concept: React app entry point.
// - React renders <App /> into the DOM (index.html has <div id="root"></div>).
// - This keeps our UI declarative: we describe WHAT UI should look like, not HOW to manipulate DOM manually.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.css"; // External CSS for the whole app (Module A styling)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
