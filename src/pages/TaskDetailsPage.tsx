import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TaskContext } from '../context/TaskProvider';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return <div>Error: TaskContext is not available.</div>;
  }

  const { tasks, addTask } = taskContext;
  const task = tasks.find(task => task.id === parseInt(id || '', 10));

  const [title, setTitle] = useState(task?.title || '');

  const handleUpdate = () => {
    if (task) {
      addTask({ ...task, title });
    }
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h2>Edit Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
      />
      <button onClick={handleUpdate} className="btn btn-custom mt-2">Update Task</button>
    </div>
  );
};

export default TaskDetails;
