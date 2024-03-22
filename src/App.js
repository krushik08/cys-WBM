import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "./assets/global/Theme-variable";
import Themeroutes from "./routes/Router";
import "./assets/style.css";
import { Toaster } from 'react-hot-toast';


const App = () => {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "'DM Sans', sans-serif",
          },
        }}
      />
      <ThemeProvider theme={theme}>{routing}</ThemeProvider>
    </>
  );
};

export default App;
