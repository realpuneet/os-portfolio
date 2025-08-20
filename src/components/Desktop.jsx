import React from "react";
import { useWindows } from "../context/WindowContext";
import Window from "./Window";
import Taskbar from "./Taskbar";
import DesktopWallpaper from "../assets/DesktopWallpaper.jpg";
import { apps } from "../config/appConfig";
import { i } from "motion/react-client";

const Desktop = () => {
  const { state, dispatch } = useWindows();

  console.log("Window state: ", state.windows);


  const openApp = (app) => {
    dispatch({
      type: "OPEN_WINDOW",
      payload: {
        id: app.id,
        title: app.title,
        readOnly: app.readOnly,
        icon: app.icon,
      },
    });
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${DesktopWallpaper})`,
      }}
    >
      {/* Left-aligned icons like Windows desktop */}
      <div className="absolute top-4 left-4 flex flex-col flex-wrap h-[calc(100vh-4rem)] w-40 gap-y-6">
        {apps.map((app) => (
          <div
            key={app.id}
            onDoubleClick={() => openApp(app)}
            className="flex flex-col items-center text-white cursor-pointer hover:scale-105 transition-transform"
          >
            <div className=" h-[2rem] drop-shadow-md">
              <img
                className="h-full object-cover w-[2rem]"
                src={app.icon}
                alt=""
              />
            </div>
            <div className="text-sm mt-1 text-center drop-shadow-md">
              {app.title}
            </div>
          </div>
        ))}
      </div>

      {/* Open Windows */}
      {state.windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          readOnly={win.readOnly}
        >
          <p className="text-black">
            This is the <strong>{win.title}</strong> app content.
          </p>
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

export default Desktop;
