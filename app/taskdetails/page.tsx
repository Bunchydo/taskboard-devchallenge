type TaskDetailsProps = {
  onClose: () => void;
};

export default function TaskDetails({ onClose }: TaskDetailsProps) {
  return (
    <div className="holding-background bg-[#c6c8ca] w-full h-[100vh] p-[3%] z-100 top-0 left-0 absolute flex flex-col justify-between items-center">
      <div className="holder-container p-[4%] rounded-[10px] w-[90%] h-[100%] bg-white flex flex-col justify-between">
        <div className="top p-[4%] rounded-[10px] w-[100%] h-[80%] bg-white flex flex-col justify-between">
          <div className="Taskdetails text-[25px]">Task Details</div>

          <div className="taskname flex flex-col ">
            Task name
            <input
              className="border rounded-[5px] p-[1%] border-gray-500"
              type="text"
            />
          </div>

          <div className="taskdescription flex flex-col">
            Task description
            <input
              className="border rounded-[5px] p-[3%] h-[20vh] border-gray-500"
              type="text"
            />
          </div>

          <div className="task-icon flex flex-col">
            Icon
            <span className="-icon-row flex justify-between w-[60%]">
              <button className="icon-images bg-[#a0aabb] w-fit">img</button>
              <button className="icon-images bg-[#a0aabb] w-fit">img</button>
              <button className="icon-images bg-[#a0aabb] w-fit">
                img
              </button>{" "}
              <button className="icon-images bg-[#a0aabb] w-fit">img</button>{" "}
              <button className="icon-images bg-[#a0aabb] w-fit">img</button>
            </span>
          </div>

          <div className="status flex flex-wrap gap-[6%] ">
            <div className="status w-[100%]">Status</div>
            <div className="in-progress w-[47%] border border-[1.5px] rounded-[12px] p-[2%] ">
              In Progress
            </div>
            <div className="completed w-[47%] border border-[1.5px] rounded-[12px] p-[2%]  ">
              Completed
            </div>
            <div className="wont-do w-[45%] border border-[1.5px] rounded-[12px] p-[2%] ">
              Wont' do
            </div>
          </div>
        </div>

        <div className="bottom flex justify-end gap-[8%]">
          <button
            className="delete bg-[#a0aabb] pt-[1%] pb-[1%] pl-[7%] pr-[7%] rounded-[17px] text-white"
            onClick={onClose}
          >
            Delete
          </button>

          <button className="save bg-[#3662e3] pt-[1%] pb-[1%] pl-[7%] pr-[7%] rounded-[17px] text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
