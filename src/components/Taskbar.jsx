import React from "react";
import { useWindows } from "../context/WindowContext";

const Taskbar = () => {
  const { state, dispatch } = useWindows();

  const toggleMinimize = (id, minimized) => {
    if (minimized) {
      dispatch({ type: "TOGGLE_MINIMIZE", payload: id });
      dispatch({ type: "FOCUS_WINDOW", payload: id });
    } else {
      dispatch({ type: "TOGGLE_MINIMIZE", payload: id });
    }
  };

  return <div></div>;
};

export default Taskbar;
