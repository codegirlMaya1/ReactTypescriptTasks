import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface Task {
  id: number;
  title: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
  details: string;
  status: 'in-progress' | 'completed';
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: 'Sample Task 1', priority: 'high', timestamp: Date.now(), details: 'Details for Sample Task 1', status: 'in-progress' },
      { id: 2, title: 'Sample Task 2', priority: 'medium', timestamp: Date.now(), details: 'Details for Sample Task 2', status: 'in-progress' },
      { id: 3, title: 'Sample Task 3', priority: 'low', timestamp: Date.now(), details: 'Details for Sample Task 3', status: 'in-progress' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
