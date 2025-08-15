import React from "react";
import { useWindows } from "../context/WindowContext";
import Window from "./Window";

const Desktop = () => {
  const { state, dispatch } = useWindows();

  const apps = [
      { id: "projects", title: "This PC", icon: "💻", readOnly: true },
      { id: "about", title: "Notepad", icon: "📄", readOnly: true },
    { id: "skills", title: "Settings", icon: "🛠️", readOnly: true },
    { id: "contact", title: "Mail", icon: "✉️", readOnly: true },
    { id: "calculator", title: "Calculator", icon: "🧮", readOnly: false },
    { id: "game", title: "Games", icon: "🎮", readOnly: false },
  ];

  const openApp = (app) => {
    dispatch({
      type: "OPEN_WINDOW",
      payload: {
        id: app.id,
        title: app.title,
        readOnly: app.readOnly,
      },
    });
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVza3RvcCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D')",
      }}
    >
      <div className="p-4 grid grid-cols-2  sm:grid-cols-4 md:grid-cols-6 gap-4">
        {apps.map((app) => (
          <div
            key={app.id}
            onDoubleClick={() => openApp(app)}
            className="flex flex-col items-center-safe text-white cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="text-3xl">{app.icon}</div>
            <div className="text-sm mt-1 text-center">{app.title}</div>
          </div>
        ))}
      </div>

      {state.windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          readOnly={win.readOnly}
        >
          <p className="text-white">
            This is the <strong>{win.title}</strong> app content.
          </p>
        </Window>
      ))}
    </div>
  );
};

export default Desktop;
