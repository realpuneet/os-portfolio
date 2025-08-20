import React from "react";
import { useWindows } from "../context/WindowContext";
import {apps} from "../config/appConfig";
import "../App.css"

export function StartMenu({ closeMenu }) {
  const { dispatch } = useWindows();

 
  const openApp = (app) => {
    dispatch({ type: "OPEN_WINDOW", payload: app, icon: app.icon });
    closeMenu();
  };

  return (
    <div className="absolute bottom-12 left-2 w-64 bg-gray-800 text-white rounded-md shadow-lg p-3 z-[99999]">
      <h2 className="text-lg font-bold border-b border-gray-600 pb-2 mb-2">
        Apps
      </h2>
      <div className="flex flex-col h-80 space-y-3 overflow-y-scroll hide-scrollbar">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => openApp(app)}
            className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700"
          >
            <img src={app.icon} alt={app.title} className="w-5 h-5" />
            <span>{app.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
