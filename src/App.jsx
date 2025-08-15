import React from "react";
import Desktop from "./components/Desktop";
import { WindowProvider } from "./context/WindowContext";

export default function App() {
  return (
    <WindowProvider>
      <Desktop />
    </WindowProvider>
  );
}
