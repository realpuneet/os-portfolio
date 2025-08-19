import React, { useState } from "react";
import Desktop from "./components/Desktop";
import { WindowProvider } from "./context/WindowContext";
import BootScreen from "./components/BootScreen";

export default function App() {
  const [bootDone, setBootDone] = useState(false);
  return (
    <WindowProvider>
      {bootDone ? (
        <Desktop />
      ) : (
        <BootScreen onBootComplete={() => setBootDone(true)} />
      )}
    </WindowProvider>
  );
}
