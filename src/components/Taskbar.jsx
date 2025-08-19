import React, {useState} from "react";
import { useWindows } from "../context/WindowContext";
import { StartMenu } from "./StartMenu";

const Taskbar = () => {
  const { state, dispatch } = useWindows();
  const [startOpen, setStartOpen] = useState(false);

  const toggleMinimize = (id, minimized) => {
    if (minimized) {
      dispatch({ type: "TOGGLE_MINIMIZE", payload: id });
      dispatch({ type: "FOCUS_WINDOW", payload: id });
    } else {
      dispatch({ type: "TOGGLE_MINIMIZE", payload: id });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-[#2C2C2C] flex items-center px-2 shadow-inner z-[9999]">
      {/* Start Button */}
      <button
        onClick={() => setStartOpen(!startOpen)}
        className="px-3 py-1 flex items-center space-x-1  hover:bg-gray-700 text-white font-semibold rounded-md"
      >
        <img src="https://www.elevenforum.com/data/attachments/104/104596-2028156ae26e3192072f55caf5f9b46c.jpg?hash=ICgVauJuMZ" alt="start" className="w-6 h-6" />
        
      </button>

      {/* Open Windows */}
      <div className="flex space-x-2 ml-3">
        {state.windows.map((win) => (
          <button
            key={win.id}
            onClick={() => toggleMinimize(win.id, win.minimized)}
            className={`px-2 py-1 flex items-center space-x-1 rounded-md ${
              win.minimized
                ? "bg-transparent text-gray-300"
                : "bg-gray-600 text-white"
            }`}
          >
            {win.icon && (
              <img src={win.icon} alt={win.title} className="w-6 h-6" />
            )}
            {/* <span className="text-sm">{win.title}</span> */}
          </button>
        ))}
      </div>

      {/* Start Menu */}
      {startOpen && <StartMenu closeMenu={() => setStartOpen(false)} />}
    </div>
  );
};

export default Taskbar;
