import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { OverlayProvider } from "@toss/use-overlay";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <OverlayProvider>
        <App />
      </OverlayProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
