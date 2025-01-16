import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TodoList from "./TakeList";

const Dashboard = () => {
  const [taskCounts] = useState({ total: 7, completed: 2 });
  const [section, setSection] = useState('allTasks');

  const handleFilterTasks = (section) => {
    setSection(section); // Set active section to either allTasks or important
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        totalTasks={taskCounts.total}
        completedTasks={taskCounts.completed}
        onFilterTasks={handleFilterTasks}
      />
      <div className="flex-1">
        <Navbar />
        <TodoList section={section} />
      </div>
    </div>
  );
};

export default Dashboard;
