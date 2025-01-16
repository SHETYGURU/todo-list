import React, { useState, useEffect } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDoc } from "firebase/firestore";
import firebaseConfig from "./connection_db";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const userEmail = "user@example.com";

  useEffect(() => {
    const taskId = localStorage.getItem(userEmail);
    if (taskId) {
      fetchTasksFromFirestore(taskId);
    }
  }, []);

  const fetchTasksFromFirestore = async (taskId) => {
    try {
      const taskDocRef = doc(db, "tasks", taskId);
      const taskDocSnap = await getDoc(taskDocRef);
      if (taskDocSnap.exists()) {
        const taskData = taskDocSnap.data();
        setTasks(taskData.activeTasks || []);
        setCompletedTasks(taskData.completedTasks || []);
      }
    } catch (error) {
      console.error("Error fetching tasks from Firestore: ", error);
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskId = Date.now();
      setTasks([...tasks, { id: newTaskId, text: newTask, completed: false, priority: 0 }]);
      setNewTask("");
    }
  };

  const handleCheckboxChange = (task) => {
    if (task.completed) {
      setCompletedTasks(completedTasks.filter((t) => t.id !== task.id));
      setTasks([...tasks, { ...task, completed: false }]);
    } else {
      setTasks(tasks.filter((t) => t.id !== task.id));
      setCompletedTasks([...completedTasks, { ...task, completed: true }]);
    }
  };

  const toggleStar = (task, starIndex, isCompleted) => {
    const updatedPriority = task.priority === starIndex ? starIndex - 1 : starIndex;
    if (isCompleted) {
      setCompletedTasks(
        completedTasks.map((t) =>
          t.id === task.id ? { ...t, priority: updatedPriority } : t
        )
      );
    } else {
      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...t, priority: updatedPriority } : t
        )
      );
    }
  };

  const renderStars = (task, isCompleted) => {
    return (
      <div className="flex space-x-1">
        {[1, 2].map((star) => (
          <button
            key={star}
            onClick={() => toggleStar(task, star, isCompleted)}
            className="text-lg focus:outline-none"
          >
            {task.priority >= star ? (
              <span className="text-black">★</span>
            ) : (
              <span className="text-gray-500">☆</span>
            )}
          </button>
        ))}
      </div>
    );
  };

  const handleDelete = (taskId, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter((t) => t.id !== taskId));
    } else {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  const handleSave = async () => {
    try {
      const taskDocRef = doc(collection(db, "tasks"));
      const newTaskId = taskDocRef.id;
      await setDoc(taskDocRef, {
        activeTasks: tasks,
        completedTasks: completedTasks,
      });

      localStorage.setItem(userEmail, newTaskId);
    } catch (error) {
      console.error("Error saving tasks to Firestore: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-4 py-2 text-sm text-gray-800 bg-gray-100 border-[0.5px] border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-black"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 px-3 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-black flex items-center justify-center"
        >
          <FiPlus className="mr-1" /> Add Task
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleSave}
          className="px-3 py-2 text-sm font-medium text-black bg-white border-[0.5px] border-black rounded-lg hover:bg-gray-200"
        >
          Save Tasks
        </button>
      </div>

      <h2 className="mb-2 text-lg font-semibold text-gray-800">Active Tasks</h2>
      <ul className="divide-y divide-gray-300">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-black-500 border-gray-400 rounded focus:ring-black"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task)}
              />
              <span className="ml-3 text-sm text-gray-800">{task.text}</span>
            </div>
            <div className="flex items-center space-x-2">
              {renderStars(task, false)}
              <button
                onClick={() => handleDelete(task.id, false)}
                className="text-gray-400 hover:text-red-500"
              >
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 mb-2 text-lg font-semibold text-gray-800">Completed Tasks</h2>
      <ul className="divide-y divide-gray-300">
        {completedTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-500 border-gray-400 rounded focus:ring-green-500"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task)}
              />
              <span className="ml-3 text-sm text-gray-500 line-through">{task.text}</span>
            </div>
            <div className="flex items-center space-x-2">
              {renderStars(task, true)}
              <button
                onClick={() => handleDelete(task.id, true)}
                className="text-gray-400 hover:text-red-500"
              >
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
