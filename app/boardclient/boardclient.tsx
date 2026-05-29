"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import TaskDetails from "../taskdetails/page";
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

export default function BoardClient({
  boardInfo,
  tasks: initialTasks,
  colors,
}: Props) {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [tasks, setTasks] = useState(initialTasks || []);

  // Function to fetch tasks - can be called anytime
  const fetchTasks = async () => {
    if (!boardInfo?.board_id) return;

    console.log("Fetching tasks from database...");

    const { data, error } = await supabase
      .from("task")
      .select("task_id, name")
      .eq("board_id", boardInfo.board_id);

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      console.log("Fetched tasks:", data);
      setTasks(data || []);
    }
  };

  // Fetch tasks when component first loads
  useEffect(() => {
    fetchTasks();
  }, [boardInfo?.board_id]);

  // Simple refresh function - just calls fetchTasks directly
  const refreshTasks = () => {
    console.log("Refresh triggered - hard reloading page...");
    window.location.reload(); // This forces a full page refresh
  };
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
            onClick={() => {
              setShowTaskDetails(true);
              setSelectedTaskId(task.task_id);
            }}
          >
            <span className="icon-emoji">📌</span>
            <span className="icon-text">{task.name}</span>
          </div>
        ))}

        <AddTaskButton
          onClick={() => {
            setSelectedTaskId(null);
            setShowTaskDetails(true);
          }}
        />
      </div>

      {showTaskDetails && (
        <TaskDetails
          onClose={() => setShowTaskDetails(false)}
          taskId={selectedTaskId}
          onTaskSaved={refreshTasks}
        />
      )}
    </div>
  );
}
