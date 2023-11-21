// App.tsx
import React, { useState } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Footer from './components/Footer/Footer';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Recupera as tarefas salvas no localStorage ao iniciar o componente
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const handleTaskAdd = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleTaskMove = (sourceIndex: number, destinationIndex: number) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(sourceIndex, 1);
    updatedTasks.splice(destinationIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Header />
      <List
        tasks={tasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onTaskMove={handleTaskMove}
      />
      <Footer onTaskAdd={handleTaskAdd} />
    </div>
  );
};

export default App;
