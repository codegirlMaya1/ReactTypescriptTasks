import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TaskContext } from '../context/TaskProvider';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return <div>Error: TaskContext is not available.</div>;
  }

  const { tasks } = taskContext;
  const task = tasks.find(task => task.id === parseInt(id || '', 10));

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>Task ID: {task.id}</p>
    </div>
  );
};

export default TaskDetails;
