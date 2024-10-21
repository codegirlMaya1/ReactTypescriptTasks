import React, { useContext, useState } from 'react';
import { TaskContext, Task } from '../context/TaskProvider';

const ManageTasksPage: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return <div>Error: TaskContext is not available.</div>;
  }

  const { tasks, deleteTask, updateTask } = taskContext;
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<'in-progress' | 'completed'>('in-progress');

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setPriority(task.priority);
    setDetails(task.details);
    setStatus(task.status);
  };

  const handleUpdate = () => {
    if (editingTask) {
      updateTask({ ...editingTask, title, priority, details, status });
      setEditingTask(null);
      setTitle('');
      setPriority('low');
      setDetails('');
      setStatus('in-progress');
    }
  };

  const sortedTasks = tasks.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Manage Tasks</h1>
          <ul>
            {sortedTasks.map(task => (
              <li key={task.id}>
                {task.title} - {task.priority} - {task.status}
                <p>{task.details}</p>
                <button onClick={() => handleEdit(task)} className="btn btn-custom ml-2">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="btn btn-custom ml-2">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          {editingTask && (
            <div>
              <h2>Edit Task</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              <button onClick={handleUpdate} className="btn btn-custom mt-2">Update Task</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTasksPage;
