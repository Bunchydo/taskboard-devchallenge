import { supabase } from "../../../lib/supabase";
import TaskDetails from "@/app/taskdetails/page";
import AddTaskButton from "@/app/button/page";
export default async function Board({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: board_id } = await params;

  console.log(board_id);

  const { data } = await supabase
    .from("task")
    .select("task_id,name")
    .eq("board_id", board_id);
  const colors = ["#f5d566", "#a1ecb1", "#f7d3d3", "#e3e8ee", "#f5e8d5"];

  const { data: boardInfo } = await supabase
    .from("board")
    .select("board_id,name,description")
    .eq("board_id", board_id)

    .single();

  {
    /*JSX Begins*/
  }
  return (
    <div className="main flex flex-col w-[90%] h-[70vh] justify-between ">
      <div className="title-box text-[30px]">{boardInfo?.name}</div>
      <div className="title-description">{boardInfo?.description}</div>

      <div className="task-container flex flex-col justify-between h-[65%]">
        {data?.map((task, index) => (
          <div
            className="task-box p-[4%] rounded-[15px] "
            key={task.task_id}
            style={{
              backgroundColor: colors[index % colors.length],
            }}
          >
            <span className="icon-emoji">📌</span>
            <span className="icon-text">{task.name}</span>
          </div>
        ))}
        <AddTaskButton></AddTaskButton>
      </div>
    </div>
  );
}
