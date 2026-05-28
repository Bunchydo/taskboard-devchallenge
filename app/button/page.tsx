"use client";
import { useState } from "react";
import TaskDetails from "../taskdetails/page";

export default function AddTaskButton() {
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  return (
    <div>
      <div
        className="add-task bg-[#f5e8d5] p-[4%] rounded-[15px] cursor-pointer"
        onClick={() => setShowTaskDetails(true)}
      >
        Add new task
      </div>

      {showTaskDetails && (
        <TaskDetails onClose={() => setShowTaskDetails(false)} />
      )}
    </div>
  );
}
