
import {
  IconTrash,
  IconTag,
  IconEdit
} from '@tabler/icons-react';
import './card-todo.css';
import { useEffect, useState } from 'react';
import { Todo } from '@/models/Todo';

interface CardTodoProps {
  todo: Todo;
  onClick(): void;
  deleteTodo(todoId: string): void;
  selectTodo(todo: Todo): void;
}

function CardTodo({
  todo,
  onClick,
  deleteTodo,
  selectTodo
}: CardTodoProps) {

  const [isExpiration, setIsExpiration] = useState<boolean>(false);

  const dt = new Date(todo.date);

  function checkExpiration() {
    let result: boolean;
    const today = new Date();
    const resultDate = dt.getTime() < today.getTime();
    const resultDay = dt.getDay() === today.getDay();
    if (resultDate && !resultDay) {
      result = true;
    } else {
      return false;
    }
    return result;
  }


  useEffect(() => {
    checkExpiration();
  }, []);

  useEffect(() => {
    console.log(checkExpiration());
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
        <h6 onClick={() => selectTodo(todo)}>
          <IconEdit size={20} />
        </h6>
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

