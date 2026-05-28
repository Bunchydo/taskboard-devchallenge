export default function TaskDetails() {
  return (
    <div className="holding-background bg-[#c6c8ca] w-full h-[100vh] p-[3%] z-100 top-0 left-0 absolute flex flex-col justify-between items-center">
      <div className="holder-container p-[4%]  rounded-[10px]  w-[90%] h-[100%]   bg-white flex flex-col justify-between">
        <div className="top h-[100%] w-[90%] p-[4%]  rounded-[10px]  w-[100%] h-[100%]   bg-white flex flex-col justify-between">
          <div className="Taskdetails text-[25px]">Task Details</div>
          <div className="taskname flex flex-col ">
            Task name{" "}
            <input
              className="border rounded-[5px] p-[1%] border-gray-500"
              type="text"
            />
          </div>
          <div className="taskdescription flex flex-col">
            Task description{" "}
            <input
              className="border rounded-[5px] p-[3%] h-[10vh] border-gray-500"
              type="text"
            />
          </div>
          <div className="task-icon">
            Icon <div className="icon-images">Placeholder-img</div>
          </div>
          <div className="status">
            <div className="in-progress">In Progress</div>
            <div className="completed">Completed</div>
            <div className="wont-do">Wont' do</div>
          </div>
        </div>
        <div className="bottom">
          <div className="delete-save-button flex justify-between w-[30%] ">
            <button className="delete">Delete</button>
            <button className="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
