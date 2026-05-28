import { supabase } from "../lib/supabase";
import { redirect } from "next/navigation";

export default async function Home() {
  // 1. Create board
  const { data: board, error: boardError } = await supabase
    .from("board")
    .insert({ name: "My Task Board", description: "Task to keep organized" })
    .select("board_id")
    .single();

  if (boardError || !board) {
    throw new Error("Failed to create board");
  }

  // 2. Create 4 default tasks
  const defaultTasks = [
    {
      board_id: board.board_id,
      name: "Task in Progress",
      description: "Default task",
      status: "todo",
    },
    {
      board_id: board.board_id,
      name: "Task Completed",
      description: "Default task",
      status: "todo",
    },
    {
      board_id: board.board_id,
      name: "Task Won't Do",
      description: "Default task",
      status: "todo",
    },
    {
      board_id: board.board_id,
      name: "Task To Do",
      description: "Default task",
      status: "todo",
    },
  ];

  const { error: taskError } = await supabase.from("task").insert(defaultTasks);

  // 3. Redirect to board
  redirect(`/board/${board.board_id}`);
}
