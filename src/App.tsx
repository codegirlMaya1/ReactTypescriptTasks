import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TaskDetailsPage from './pages/TaskDetailsPage';
import TaskFormPage from './pages/TaskFormPage';
import Auth from './pages/Auth';
import Registration from './pages/Registration';
import Login from './pages/Login';
import ManageTasksPage from './pages/ManageTasksPage';
import { TaskProvider } from './context/TaskProvider';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/task/:id" element={<TaskDetailsPage />} />
            <Route path="/create" element={<TaskFormPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manage-tasks" element={<ManageTasksPage />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
