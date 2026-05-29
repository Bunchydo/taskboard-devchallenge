import { supabase } from "../../../lib/supabase";
import BoardClient from "../../boardclient/boardclient";

type Task = {
  task_id: string;
  name: string;
};

type BoardInfo = {
  board_id: string;
  name: string;
  description: string;
};

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>; //
};

export default async function Board({ params }: Props) {
  const { id: board_id } = await params;

  const { data } = await supabase
    .from("task")
    .select("task_id,name")
    .eq("board_id", board_id);

  const { data: boardInfo } = await supabase
    .from("board")
    .select("board_id,name,description")
    .eq("board_id", board_id)
    .single();

  const colors = ["#f5d566", "#a1ecb1", "#f7d3d3", "#e3e8ee", "#f5e8d5"];

  return <BoardClient boardInfo={boardInfo} tasks={data} colors={colors} />;
}
