import React, { useState, useEffect } from "react";
import { Wifi, Volume2, BatteryMedium, Globe, Keyboard } from "lucide-react"; // lucide-react icons use karenge

const TaskbarRight = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time and date
  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  const formattedDate = time.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="ml-auto flex items-center space-x-4 text-white pr-3">
      {/* Icons */}
      <div className="flex items-center space-x-3">
        <Keyboard className="w-5 h-5" />
        <Globe className="w-5 h-5" />
        <Wifi className="w-5 h-5" />
        <Volume2 className="w-5 h-5" />
        <BatteryMedium className="w-5 h-5" />
      </div>

      {/* Time & Date */}
      <div className="flex flex-col items-end leading-tight">
        <span className="text-sm">{formattedTime}</span>
        <span className="text-xs text-gray-300">{formattedDate}</span>
      </div>
    </div>
  );
};

export default TaskbarRight;
