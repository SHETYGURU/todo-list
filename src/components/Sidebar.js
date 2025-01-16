import React, { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { FaCalendarAlt, FaStar, FaMap, FaUser, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ totalTasks, completedTasks, onFilterTasks }) => {
  const [showDate, setShowDate] = useState(false);
  const [currentDate] = useState(new Date().toLocaleDateString());
  
  const navigate = useNavigate();

  const handleClick = () => {
    setShowDate(true);
    setTimeout(() => {
      setShowDate(false);
    }, 1000);
  };

  const handleAllTasksClick = () => {
    window.location.reload();
  };

  const handleImportantClick = () => {
    onFilterTasks('important');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="h-screen w-56 bg-gray-100 p-4 relative">
      <div className="flex flex-col items-center mb-4">
        <img
          src="/assets/profile.gif"
          alt="Profile"
          className="w-14 h-14 rounded-full mb-2 cursor-pointer"
          onClick={handleProfileClick}
        />
        <h3 className="text-sm font-medium text-gray-800">Profile</h3>
      </div>

      <div className="space-y-1">
        <button className="flex items-center px-2 py-1 rounded-lg hover:bg-gray-200 text-sm" onClick={handleAllTasksClick}>
          <FaTasks className="text-gray-700" />
          <span className="ml-2 text-gray-700">All Tasks</span>
        </button>
        <button
          className="flex items-center px-2 py-1 rounded-lg hover:bg-gray-200 text-sm"
          onMouseEnter={handleClick}
          onClick={handleClick}
        >
          <FaCalendarAlt />
          <span className="ml-2">Today</span>
        </button>

        {showDate && (
          <div className="absolute right-0 bg-white text-gray-700 p-2 rounded-lg shadow-lg mt-2 w-32 text-center opacity-100 transition-all duration-300">
            <p>{currentDate}</p>
          </div>
        )}

        <button className="flex items-center px-2 py-1 rounded-lg hover:bg-gray-200 text-sm" onClick={handleImportantClick}>
          <FaStar className="text-gray-700" />
          <span className="ml-2 text-gray-700">Important</span>
        </button>
        <button className="flex items-center px-2 py-1 rounded-lg hover:bg-gray-200 text-sm">
          <FaMap className="text-gray-700" />
          <span className="ml-2 text-gray-700">Planned</span>
        </button>
        <button className="flex items-center px-2 py-1 rounded-lg hover:bg-gray-200 text-sm">
          <FaUser className="text-gray-700" />
          <span className="ml-2 text-gray-700">Assigned to me</span>
        </button>
      </div>

      <button className="flex items-center mt-4 px-2 py-1 rounded-lg text-gray-500 hover:bg-gray-200 text-sm">
        <FaPlusCircle />
        <span className="ml-2">Add list</span>
      </button>

      <div className="mt-6 p-3 bg-transparent">
        <div className="flex justify-center">
          <img
            src="/assets/todo.png"
            alt="Tasks Overview"
            className="w-20 h-20 transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
