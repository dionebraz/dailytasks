// Footer.tsx
import React, { useState, ChangeEvent } from 'react';
import './styles.css';

interface FooterProps {
  onTaskAdd: (task: Task) => void;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const Footer: React.FC<FooterProps> = ({ onTaskAdd }) => {
  const [task, setTask] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSaveTask = () => {
    if (task.trim() !== '') {
      const newTask: Task = {
        id: String(new Date().getTime()), // Gera um ID único baseado no timestamp
        text: task,
        completed: false,
      };

      // Adiciona a nova tarefa ao array de tarefas
      onTaskAdd(newTask);
      // Limpa o campo de input
      setTask('');
    }
  };

  return (
    <footer className="footer">
      <div className="task-input">
        <input type="text" placeholder="Digite sua tarefa" value={task} onChange={handleInputChange} />
        <button onClick={handleSaveTask}>Adicionar</button>
      </div>
    </footer>
  );
};

export default Footer;
