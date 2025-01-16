import React, { useState } from "react";
import { FaBell, FaSyncAlt, FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Navbar = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [iconColor, setIconColor] = useState("#5D7461");

  const handleCalendarClick = () => {
    setIsCalendarVisible(!isCalendarVisible);
    setIconColor(isCalendarVisible ? "#5D7461" : "black");
  };

  return (
    <div className="bg-[#F5F9F6] flex justify-between items-center p-4 border-b border-[#E6EFE6] relative">
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-semibold text-[#5D7461] animate-bounce">To Do</h2>
      </div>

      <div className="flex-grow mx-8 text-center hidden md:block">
        <p className="text-sm italic text-[#5D7461]">
          "Productivity is not about doing more; it’s about doing what matters."
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <FaBell
          className="w-5 h-5"
          style={{ color: iconColor }}
          onClick={() => setIconColor("black")}
        />
        <FaSyncAlt
          className="w-5 h-5"
          style={{ color: iconColor }}
          onClick={() => setIconColor("black")}
        />
        <FaCalendarAlt
          className="w-5 h-5"
          style={{ color: iconColor }}
          onClick={handleCalendarClick}
        />
      </div>

      {isCalendarVisible && (
        <div className="absolute top-16 right-10 bg-white border border-[#E6EFE6] shadow-lg p-4 rounded-lg z-10">
          <h3 className="text-lg font-semibold mb-4">Calendar</h3>
          <Calendar />
        </div>
      )}
    </div>
  );
};

export default Navbar;
