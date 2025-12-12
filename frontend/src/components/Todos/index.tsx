
import './todos.css';
import { Todo } from '@/models/Todo';
import { CardTodo } from '../CardTodo';
import { useEffect, useState } from 'react';

interface TodosProps {
  todos: Todo[];
}

function Todos({ todos }: TodosProps) {

  const [notCompleted, setNotCompleted] = useState<Todo[]>([]);

  useEffect(() => {
    const not = todos.filter((todo: Todo) => todo.completed === false);
    setNotCompleted(not);
  }, []);

  function finish() {
    console.log('finalizado');
  }

  return (
    <section className='container-todos'>
      <h3>Tarefas por fazer</h3>
      {notCompleted.map((todo) => (
        <CardTodo
          title={todo.title}
          date={todo.date}
          priority={todo.priority}
          description={todo.description}
          onClick={finish}
        />
      ))}
    </section>
  );

}

export { Todos }

