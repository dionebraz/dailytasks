// List.tsx
import React, { useState } from 'react';
import './styles.css';

interface ListProps {
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const List: React.FC<ListProps> = ({ tasks, onTaskUpdate, onTaskDelete }) => {
  const [editableTask, setEditableTask] = useState<Task | null>(null);

  const handleCheckboxChange = (taskId: string) => {
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (updatedTask) {
      updatedTask.completed = !updatedTask.completed;
      onTaskUpdate(updatedTask);
    }
  };

  const handleDeleteClick = (taskId: string) => {
    onTaskDelete(taskId);
  };

  const handleEditClick = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditableTask(taskToEdit);
    }
  };

  const handleEditCancel = () => {
    setEditableTask(null);
  };

  const handleEditSave = () => {
    if (editableTask) {
      onTaskUpdate(editableTask);
      setEditableTask(null);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editableTask) {
      setEditableTask({ ...editableTask, text: e.target.value });
    }
  };

  return (
    <div className="list">
      <h2>Suas Tarefas</h2>
      {tasks.length === 0 ? (
        <div className="empty-list">
          <img src="https://ouch-cdn2.icons8.com/lTJXLuxlE3XWkH2OK2v0iPJBmmS1yRLX7NM4k2xBMaE/rs:fit:341:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy91aS1lbGVt/LzExOC9jMzJkOWJk/Zi01MjE1LTQ2YjUt/YjMwNy0yMWNmZmI5/NzdiZjQucG5n.png" alt="Lista Vazia" />
          <p>Nenhuma tarefa criada</p>
          <p>Desenvolvido por Dione Braz</p>
        </div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {editableTask?.id === task.id ? (
                <div className="edit-task">
                  <input
                    type="text"
                    value={editableTask.text}
                    onChange={handleEditInputChange}
                  />
                  <button onClick={handleEditSave}>Salvar</button>
                  <button onClick={handleEditCancel}>Cancelar</button>
                </div>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  <span>{task.text}</span>
                  <div className="task-actions">
                    <button onClick={() => handleEditClick(task.id)}>Editar</button>
                    <button onClick={() => handleDeleteClick(task.id)}>Excluir</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
