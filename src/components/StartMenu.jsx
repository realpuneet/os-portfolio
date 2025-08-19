import React from "react";
import { useWindows } from "../context/WindowContext";

export function StartMenu({ closeMenu }) {
  const { dispatch } = useWindows();

  const apps = [
    {
        id:'pc',
        title:"This PC",
        icon: 'https://ms.codes/cdn/shop/articles/this-pc-computer-display-windows-11-icon.png?v=1709255180',
        readOnly: true,
        content: <div>📂 Loading Files...</div>
    },
    {
      id: "portfolio",
      title: "My Portfolio",
      icon: "https://www.pngmart.com/files/7/Portfolio-Transparent-Background.png",
      readOnly: true,
      content: <div>📂 Portfolio Content Here...</div>,
    },
    {
      id: "calculator",
      title: "Calculator",
      icon: "https://img.freepik.com/free-psd/calculator-icon-3d-illustration_56104-2554.jpg?semt=ais_hybrid&w=740&q=80",
      readOnly: false,
      content: <div>🧮 Calculator App Placeholder</div>,
    },
    {
      id: "game",
      title: "Mini Game",
      icon: "https://img.freepik.com/premium-psd/3d-plastic-design-hightech-gaming-controller-with-sleek-lines-vibrant-led-lights_996812-10854.jpg?semt=ais_hybrid&w=740&q=80",
      readOnly: false,
      content: <div>🎮 Game Placeholder</div>,
    },
    {
      id: "contact",
      title: "Contact Form",
      icon: "https://illustoon.com/photo/7817.png",
      readOnly: false,
      content: <form className="flex flex-col space-y-2">
        <input type="text" placeholder="Name" className="p-2 rounded bg-gray-200 text-black" />
        <input type="email" placeholder="Email" className="p-2 rounded bg-gray-200 text-black" />
        <textarea placeholder="Message" className="p-2 rounded bg-gray-200 text-black" />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Send</button>
      </form>,
    },
  ];

  const openApp = (app) => {
    dispatch({ type: "OPEN_WINDOW", payload: app });
    closeMenu();
  };

  return (
    <div className="absolute bottom-12 left-2 w-64 bg-gray-800 text-white rounded-md shadow-lg p-3 z-[99999]">
      <h2 className="text-lg font-bold border-b border-gray-600 pb-2 mb-2">
        Apps
      </h2>
      <div className="flex flex-col h-80 space-y-3">
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
