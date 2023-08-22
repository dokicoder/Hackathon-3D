import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { AppContainer } from "./AppContainer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  // other theme properties
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  </React.StrictMode>
);
