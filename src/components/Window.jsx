// Window.jsx - Individual window component with drag and resize functionality
// Windows ab random positions mein khulte hain aur move/resize karne par position/size maintain karte hain
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

  // Handler - jab window drag ho to position update karo
  const handleDragStop = (e, d) => {
    dispatch({
      type: "UPDATE_POSITION",
      payload: { id, x: d.x, y: d.y }
    });
  };

  // Handler - jab window resize ho to size aur position update karo
  const handleResizeStop = (e, direction, ref, delta, position) => {
    dispatch({
      type: "UPDATE_SIZE",
      payload: {
        id,
        width: ref.offsetWidth,
        height: ref.offsetHeight,
        x: position.x,
        y: position.y
      }
    });
  };

  // Agar minimized hai to bilkul render hi mat kar
  if (win.minimized) return null;

  return (
    <Rnd
      // Stored position aur size use karo instead of defaults
      default={{
        x: win.x,
        y: win.y,
        width: win.width,
        height: win.height,
      }}
      minWidth={300}
      minHeight={200}
      bounds="window"
      disableDragging={win.maximized}
      enableResizing={!win.maximized}
      size={
        win.maximized?
        { width: "100%", height: "100%" } :
        { width: win.width, height: win.height }
      }
      position={
        win.maximized ?
        { x: 0, y: 0 } :
        { x: win.x, y: win.y }
      }
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
      // Drag aur resize ke liye event handlers add karo taaki changes save ho jayein
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
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
