"use client";

import { useState } from "react";
import TaskDetails from "@/app/taskdetails/page";
import AddTaskButton from "@/app/button/page";

type Task = {
  task_id: string;
  name: string;
};

type BoardInfo = {
  board_id: string;
  name: string;
  description: string;
};

type Props = {
  boardInfo: BoardInfo | null;
  tasks: Task[] | null;
  colors: string[];
};

export default function BoardClient({ boardInfo, tasks, colors }: Props) {
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  return (
    <div className="main flex flex-col w-[90%] h-[70vh] justify-between ">
      <div className="title-box text-[30px]">{boardInfo?.name}</div>
      <div className="title-description">{boardInfo?.description}</div>

      <div className="task-container flex flex-col justify-between h-[65%]">
        {tasks?.map((task, index) => (
          <div
            key={task.task_id}
            className="task-box p-[4%] rounded-[15px]"
            style={{ backgroundColor: colors[index % colors.length] }}
            onClick={() => setShowTaskDetails(true)}
          >
            <span className="icon-emoji">📌</span>
            <span className="icon-text">{task.name}</span>
          </div>
        ))}

        <AddTaskButton />
      </div>

      {showTaskDetails && (
        <TaskDetails onClose={() => setShowTaskDetails(false)} />
      )}
    </div>
  );
}
