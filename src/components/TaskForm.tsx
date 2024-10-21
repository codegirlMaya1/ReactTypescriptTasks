import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskProvider';

const TaskForm: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return <div>Error: TaskContext is not available.</div>;
  }

  const { addTask } = taskContext;
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<'in-progress' | 'completed'>('in-progress');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({ id: Date.now(), title, priority, timestamp: Date.now(), details, status });
    setTitle('');
    setPriority('low');
    setDetails('');
    setStatus('in-progress');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="form-control"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        className="form-control mt-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Task Details"
        className="form-control mt-2"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'in-progress' | 'completed')}
        className="form-control mt-2"
      >
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" className="btn btn-custom mt-2">Add Task</button>
    </form>
  );
};

export default TaskForm;
