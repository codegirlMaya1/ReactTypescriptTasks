import React, { useState } from 'react';
import TaskListPage from './TaskListPage';
import TaskForm from '../components/TaskForm';

const Dashboard: React.FC = () => {
  const [showTaskList, setShowTaskList] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(true);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => setShowTaskList(!showTaskList)} className="btn btn-custom mt-2">
          {showTaskList ? 'Hide' : 'Show'} Task List
        </button>
        {showTaskList && <TaskListPage />}
      </div>
      <div>
        <button onClick={() => setShowTaskForm(!showTaskForm)} className="btn btn-custom mt-2">
          {showTaskForm ? 'Hide' : 'Show'} Task Form
        </button>
        {showTaskForm && <TaskForm />}
      </div>
    </div>
  );
};

export default Dashboard;
