"use client";
import { useState } from "react";
import TaskDetails from "../taskdetails/page";

export default function AddTaskButton() {
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const handleClick = () => {
    console.log("Add task clicked");
    setShowTaskDetails(true);
  };

  return (
    <div
      className="add-task bg-[#f5e8d5] p-[4%] rounded-[15px] cursor-pointer"
      onClick={handleClick}
    >
      Add new task
      {showTaskDetails && <TaskDetails />}
    </div>
  );
}
