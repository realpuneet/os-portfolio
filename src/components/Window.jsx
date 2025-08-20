import React from "react";
import { Rnd } from "react-rnd";
import { useWindows } from "../context/WindowContext";

export default function Window({ id, title, readOnly, children }) {
  const { state, dispatch } = useWindows();
  const win = state.windows.find((w) => w.id === id);
  if (!win) return null;

  const closeWindow = () => dispatch({ type: "CLOSE_WINDOW", payload: id });
  const toggleMinimize = () =>
    dispatch({ type: "TOGGLE_MINIMIZE", payload: id });
  const toggleMaximize = () =>
    dispatch({ type: "TOGGLE_MAXIMIZE", payload: id });
  const focusWindow = () => dispatch({ type: "FOCUS_WINDOW", payload: id });

  // Agar minimized hai to bilkul render hi mat kar
  if (win.minimized) return null;

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 500,
        height: 350,
      }}
      minWidth={250}
      minHeight={150}
      bounds="window"
      disableDragging={win.maximized}
      enableResizing={!win.maximized}
      style={{
        zIndex: win.zIndex,
        backgroundColor: "#1f2237",
        color: "white",
        borderRadius: "0.375rem",
        boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
        overflow: "hidden",
      }}
      className={win.maximized ? "fixed top-0 left-0 w-full h-full" : ""}
      onMouseDown={focusWindow}
    >
      {/* Title Bar */}
      <div className="bg-gray-800 px-3 py-2 flex justify-between items-center cursor-move">
        <span className="font-semibold">{title}</span>
        <div className="space-x-2">
          <button
            onClick={toggleMinimize}
            className="text-yellow-400 hover:text-yellow-200"
          >
            🗕
          </button>
          <button
            onClick={toggleMaximize}
            className="text-green-400 hover:text-green-200"
          >
            {win.maximized ? "🗗" : "🗖"}
          </button>
          <button
            onClick={closeWindow}
            className="text-red-500 hover:text-red-300"
          >
            ✖
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white min-h-screen overflow-auto">
        {readOnly ? (
          <div className="opacity-90 pointer-events-none select-none">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </Rnd>
  );
}
