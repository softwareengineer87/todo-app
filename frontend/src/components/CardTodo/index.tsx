
import {
  IconTrash,
  IconTag
} from '@tabler/icons-react';
import './card-todo.css';
import { useEffect } from 'react';
import { Todo } from '@/models/Todo';

interface CardTodoProps {
  todo: Todo;
  onClick(): void;
  deleteTodo(todoId: string): void;
}

function CardTodo({
  todo,
  onClick,
  deleteTodo
}: CardTodoProps) {

  const dt = new Date(todo.date);

  function checkExpiration() {
    const today = new Date();
    const todoHour = Number(todo.hour.split(':')[0]);
    // const todoMinute = Number(todo.hour.split(':')[1]);
    const resultDate = dt.getDate() < today.getDate();
    const resultHour = (todoHour) < (today.getHours());
    const result = resultDate || resultHour;
    return result;
  }


  useEffect(() => {
    checkExpiration();
  }, []);

  return (
    <div className={`completed ${checkExpiration() && 'is-expiration'}`}>
      <div className='box-top'>
        <h4>{todo.title}</h4>
        <span>{dt.toLocaleDateString()}</span>
        <p>{todo.hour}hs</p>
        <p className={`priority 
          ${todo.priority === 'low' ? 'low' : todo.priority === 'medium' ? 'medium' : 'high'}`}
        >
          {todo.priority === 'low' ? 'baixa' : todo.priority === 'medium' ? 'media' : 'alta'}
        </p>
        <h5 onClick={() => deleteTodo(todo.todo_id!)}>
          <IconTrash size={20} />
        </h5>
        <button
          onClick={onClick}
          className='finish'
        >
          {todo.completed ? 'Restaurar' : 'Concluir'}
        </button>
      </div>
      <div className='box-bottom'>
        <p>{todo.description}</p>
        {checkExpiration() && (
          <h6 className='expiration'>atrasada</h6>
        )}
        <span>{todo.tag} <IconTag className='tag' /></span>
      </div>
    </div>
  );

}

export { CardTodo }

