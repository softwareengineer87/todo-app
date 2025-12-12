
import { useTodo } from '@/data/hooks/useTodo';
import './completed.css';
import { Todo } from '@/models/Todo';
import { CardTodo } from '../CardTodo';

interface CompletedTodosProps {
  todos: Todo[];
}

function CompletedTodos({ todos }: CompletedTodosProps) {

  const completeds = todos.filter((todo: Todo) => todo.completed);

  function restore() {
    console.log('restaurado');
  }

  return (
    <section className='container-completed'>
      <h3>Tarefas concluidas</h3>
      {completeds.map((todo) => (
        <CardTodo
          title={todo.title}
          date={todo.date}
          priority={todo.priority}
          description={todo.description}
          onClick={restore}
        />
      ))}
    </section>
  );

}

export { CompletedTodos }

