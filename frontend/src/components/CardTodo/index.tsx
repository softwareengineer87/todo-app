
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

  function formatDate(date: Date) {
    return Intl.DateTimeFormat('pt-br', {
      dateStyle: 'short'
    }).format(date)
  }

  function checkExpiration() {
    const now = Date.now();
    return new Date(todo.date).getTime() < now;
  }

  const [date, _] = todo.date.split('T');
  const dt = new Date(date);

  useEffect(() => {
    checkExpiration();
  }, []);

  return (
    <div className={`completed ${checkExpiration() && 'is-expiration'}`}>
      <div className='box-top'>
        <h4>{todo.title}</h4>
        <span>{formatDate(dt)}</span>
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

