import React, { useContext } from 'react';
import { TaskContext, Task } from '../context/TaskProvider';

const TaskList: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return <div>Error: TaskContext is not available.</div>;
  }

  const { tasks, deleteTask } = taskContext;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            {task.title} - {task.priority}
            <button onClick={() => deleteTask(task.id)} className="btn btn-custom ml-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
