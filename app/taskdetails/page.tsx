"use client";

type TaskDetailsProps = {
  onClose: () => void;
  taskId?: string;
  onTaskSaved?: () => void;
};
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function TaskDetails({
  onClose,
  taskId,
  onTaskSaved,
}: TaskDetailsProps) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskIcon, setTaskIcon] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // Fetch task data if taskId is provided (editing mode)
  useEffect(() => {
    if (taskId) {
      setLoading(true);
      supabase
        .from("task")
        .select("*")
        .eq("task_id", taskId)
        .single()
        .then(({ data, error }) => {
          if (data) {
            setTaskName(data.name || "");
            setTaskDescription(data.description || "");
            setTaskStatus(data.status || "");
            setTaskIcon(data.icon || "");
          }
          setLoading(false);
        });
    }
  }, [taskId]);

  const saveTask = () => {
    console.log("🔴 SAVE BUTTON CLICKED 🔴");

    if (taskId) {
      // UPDATE existing task
      supabase
        .from("task")
        .update({
          name: taskName,
          description: taskDescription,
          status: taskStatus,
          icon: taskIcon,
        })
        .eq("task_id", taskId)
        .select()
        .then((result) => {
          console.log("Task updated - result:", result);
          window.location.reload();
        });
    } else {
      // CREATE new task
      supabase
        .from("task")
        .insert([
          {
            name: taskName,
            description: taskDescription,
            board_id: params.id,
            status: taskStatus,
            icon: taskIcon,
          },
        ])
        .select()
        .then((result) => {
          console.log("Task created - result:", result);
          window.location.reload();
        });
    }
  };

  const deleteTask = () => {
    if (!taskId) return; // Can't delete if it's a new task

    console.log("🗑️ DELETE BUTTON CLICKED 🗑️");

    supabase
      .from("task")
      .delete()
      .eq("task_id", taskId)
      .then((result) => {
        console.log("Task deleted - result:", result);
        window.location.reload(); // Refresh the page
      });
  };

  if (loading) {
    return (
      <div className="holding-background bg-[#c6c8ca] w-full h-[100vh] p-[3%] z-100 top-0 left-0 absolute flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="holding-background bg-[#c6c8ca] w-full h-[100vh] p-[3%] z-100 top-0 left-0 absolute flex flex-col justify-between items-center">
      <div className="holder-container p-[4%] rounded-[10px] w-[90%] h-[100%] bg-white flex flex-col justify-between">
        <div className="top p-[4%] rounded-[10px] w-[100%] h-[80%] bg-white flex flex-col justify-between">
          <div className="Taskdetails text-[25px] flex justify-between">
            {taskId ? "Edit Task" : "Create Task"}
            <button
              onClick={onClose} // This just closes, doesn't delete
              className="text-[20px] hover:bg-gray-100 p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          <div className="taskname flex flex-col ">
            Task name
            <input
              value={taskName}
              placeholder="Enter a task name"
              onChange={(e) => setTaskName(e.target.value)}
              className="border rounded-[5px] p-[1%] border-gray-500"
              type="text"
            />
          </div>

          <div className="taskdescription flex flex-col">
            Task description
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="border rounded-[5px] p-[3%] h-[20vh] border-gray-500 "
              placeholder="Enter a short Description"
            />
          </div>

          <div className="task-icon flex flex-col">
            Icon
            <span className="-icon-row flex  w-[80%] gap-[2%]">
              {["👨🏻‍💻", "💬", "☕", "🏋️‍♂️", "📚", "⏰"].map((icon) => (
                <button
                  key={icon}
                  onClick={() => setTaskIcon(icon)}
                  className={`icon-images bg-[#d3d4d6] p-[3%] rounded-[12px] w-fit ${
                    taskIcon === icon ? "ring-2 ring-blue-500 bg-blue-100" : ""
                  }`}
                >
                  {icon}
                </button>
              ))}
            </span>
          </div>

          <div className="status flex flex-wrap gap-[6%] ">
            <div className="status w-[100%]">Status</div>
            <button
              onClick={() => setTaskStatus("In Progress")}
              className={`in-progress w-[47%] border border-[1.5px] rounded-[12px] p-[2%] ${
                taskStatus === "In Progress"
                  ? "border-blue-500 border-2 bg-blue-50"
                  : ""
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setTaskStatus("Completed")}
              className={`completed w-[47%] border border-[1.5px] rounded-[12px] p-[2%] ${
                taskStatus === "Completed"
                  ? "border-green-500 border-2 bg-green-50"
                  : ""
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setTaskStatus("Won't Do")}
              className={`wont-do w-[45%] border border-[1.5px] rounded-[12px] p-[2%] ${
                taskStatus === "Won't Do"
                  ? "border-red-500 border-2 bg-red-50"
                  : ""
              }`}
            >
              Won't do
            </button>
          </div>
        </div>

        <div className="bottom flex justify-end gap-[8%]">
          <button
            className="delete bg-red-500 pt-[1%] pb-[1%] pl-[7%] pr-[7%] rounded-[17px] text-white hover:bg-red-600"
            onClick={deleteTask} // This DELETES the task
          >
            Delete
          </button>

          <button
            onClick={saveTask}
            className="save bg-[#3662e3] pt-[1%] pb-[1%] pl-[7%] pr-[7%] rounded-[17px] text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
