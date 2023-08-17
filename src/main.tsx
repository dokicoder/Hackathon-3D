import React from "react";
import { createRoot } from "react-dom/client";
import { TestScene } from "./TestScene";
import "./main.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <div id="main-container">
      <h1>Hackathon Starter</h1>
      <h2>Try dragging the mouse or hovering the apple!</h2>
      <TestScene />
    </div>
  </React.StrictMode>
);
