'use client';

import { FormTodo } from '@/components/FormTodo';
import './page.css';
import { useEffect, useState } from 'react';
import { Todo } from '@/models/Todo';
import { useTodo } from '@/data/hooks/useTodo';
import { baseURL } from '@/utils/baseUrl';
import { CardTodo } from '@/components/CardTodo';

export default function Home() {

  const [todo, setTodo] = useState<Todo>({} as Todo);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [active, setActive] = useState<boolean>(false);

  const {
    saveTodo,
    message,
    deleteTodo,
    changeCompleted
  } = useTodo();

  function showMessage() {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 4000);
  }

  async function getTodos() {
    try {
      const response = await fetch(`${baseURL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function todoDelete(todoId: string) {
    const ok = confirm('Deseja deletar a tarefa?');
    if (ok) {
      await deleteTodo(todoId);
      showMessage();
    }
    getTodos();
  }

  async function save() {
    await saveTodo(todo);
    getTodos();
    showMessage();
  }

  async function completed(todoId: string) {
    await changeCompleted(todoId);
    getTodos();
    showMessage();
  }

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <main className='container-main container'>
      <div className={`message ${active ? 'active' : ''}`}>
        <p>{message}</p>
      </div>
      <FormTodo
        onChange={setTodo}
        todo={todo}
        save={save}
      />
      <div className='box-todos'>
        <div className='card-todo'>
          <h3>Tarefas por fazer</h3>
          {todos.filter((t) => t.completed === false).length === 0 ? (
            <p>Sem tarefas</p>
          ) : todos.filter((t) => t.completed === false)
            .map((todo) => (
              <CardTodo
                todo={todo}
                onClick={() => completed(todo.todo_id!)}
                deleteTodo={() => todoDelete(todo.todo_id!)}
              />
            ))}
        </div>
        <div className='card-todo'>
          <h3>Tarefas completas</h3>
          {todos.filter((t) => t.completed).length === 0 ? (
            <p>Sem tarefas</p>
          ) : todos.filter((t) => t.completed)
            .map((todo) => (
              <CardTodo
                todo={todo}
                onClick={() => completed(todo.todo_id!)}
                deleteTodo={() => todoDelete(todo.todo_id!)}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
