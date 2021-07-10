import Task from "./Task";

// Taking in tasks as a property
// Looping through tasks and calling Task component for each task
// passing in task.id and the task as props to the Task component
// onDelete and onToggle call methods that are passed in as properties

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  );
};

export default Tasks;
