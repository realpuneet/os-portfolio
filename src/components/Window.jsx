import React from "react";
import Draggable from "react-draggable";
import { useWindows } from "../context/WindowContext";

export default function Window({ id, title, readOnly, children }) {
  const { dispatch } = useWindows();

  const closeWindow = () => {
    dispatch({ type: "CLOSE_WINDOW", payload: id });
  };

  return (
    <Draggable handle=".window-title">
      <div className="absolute top-20 left-20 w-96 bg-gray-900 text-white shadow-lg rounded-md overflow-hidden">
        
        {/* Title Bar */}
        <div className="window-title bg-gray-800 px-3 py-2 flex justify-between items-center cursor-move">
          <span className="font-semibold">{title}</span>
          <button
            onClick={closeWindow}
            className="text-red-500 hover:text-red-300"
          >
            ✖
          </button>
        </div>

        {/* Window Content */}
        <div className="p-4 bg-gray-700 min-h-[200px]">
          {readOnly ? (
            <div className="opacity-90 pointer-events-none select-none">
              {children}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </Draggable>
  );
}
