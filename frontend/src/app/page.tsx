'use client';

import { FormTodo } from '@/components/FormTodo';
import './page.css';
import { useEffect, useState } from 'react';
import { Data, Todo } from '@/models/Todo';
import { useTodo } from '@/data/hooks/useTodo';
import { baseURL } from '@/utils/baseUrl';
import { CardTodo } from '@/components/CardTodo';
import {
  IconChevronCompactLeft,
  IconChevronCompactRight,
  IconPlus
} from '@tabler/icons-react';
import { Pagination } from '@/models/Pagination';

export default function Home() {

  const [todo, setTodo] = useState<Partial<Todo> | null>(null);
  const [data, setData] = useState<Data>({} as Data);
  const [active, setActive] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);
  const [onSave, setOnSave] = useState<boolean>(false);

  const {
    saveTodo,
    message,
    deleteTodo,
    changeCompleted,
    updateTodo
  } = useTodo();

  async function changePage(page: number) {
    setPage(page);
    await getTodos();
  }

  function showMessage() {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 4000);
  }

  async function getTodos() {
    try {
      const response = await fetch(`${baseURL}/todos?page=${page}`);
      const data = await response.json();
      setData(data);
      setPagination(data.pagination);
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
    if (onSave) {
      await saveTodo(todo!);
      setTodo(null);
      setOnSave(false);
    } else {
      await updateTodo(todo!);
      setTodo(null);
      setOnSave(false);
    }
    getTodos();
    showMessage();
  }

  async function completed(todoId: string) {
    await changeCompleted(todoId);
    getTodos();
    showMessage();
  }

  function changeModeSave() {
    setTodo({});
    setOnSave(true);
  }

  function selectedTodo(todo: Todo) {
    setTodo(todo);
    setOnSave(false);
  }

  useEffect(() => {
    getTodos();
  }, [page, setPage, pagination]);

  return (
    <main className='container-main container'>
      <div className={`message ${active ? 'active' : ''}`}>
        <p>{message}</p>
      </div>
      {todo ? (
        <FormTodo
          onChange={setTodo}
          todo={todo!}
          save={save}
          cancell={() => setTodo(null)}
        />
      ) : (
        <>
          <div className='todos'>
            <button
              onClick={changeModeSave}
              className='btn-new'
            >
              <IconPlus /> nova tarefa
            </button>
            <div className='box-todos'>
              <div className='card-todo'>
                <h3>Tarefas por fazer</h3>
                {data.data?.filter((t) => t.completed === false).length === 0 ? (
                  <p>Sem tarefas</p>
                ) : data.data?.filter((t) => t.completed === false)
                  .map((todo) => (
                    <CardTodo
                      todo={todo}
                      onClick={() => completed(todo.todo_id!)}
                      deleteTodo={() => todoDelete(todo.todo_id!)}
                      selectTodo={() => selectedTodo(todo)}
                    />
                  ))}
              </div>
              <div className='card-todo'>
                <h3>Tarefas completas</h3>
                {data.data?.filter((t) => t.completed).length === 0 ? (
                  <p>Sem tarefas</p>
                ) : data.data?.filter((t) => t.completed)
                  .map((todo) => (
                    <CardTodo
                      todo={todo}
                      onClick={() => completed(todo.todo_id!)}
                      deleteTodo={() => todoDelete(todo.todo_id!)}
                      selectTodo={() => selectedTodo(todo)}
                    />
                  ))}
              </div>
            </div>
          </div>
          <section className='pagination'>
            {pagination.actualPage >= 2 && (
              <button
                onClick={() => changePage(pagination.actualPage - 1)}
                className='icon'>
                <IconChevronCompactLeft size={25} />
              </button>
            )}
            <div className='numbers'>
              <p
                onClick={() => changePage(pagination.prevPage)}>
                {pagination.prevPage !== pagination.actualPage && pagination.prevPage}
              </p>
              <p
                className={`${pagination.actualPage && 'active'}`}
                onClick={() => changePage(pagination.actualPage)}>
                {pagination.actualPage}
              </p>
              <p
                className={`${pagination.actualPage === pagination.lastPage && 'active'}`}
                onClick={() => changePage(pagination.nextPage)}>
                {pagination.nextPage !== pagination.actualPage && pagination.nextPage}
              </p>
            </div>
            {pagination.actualPage !== pagination.lastPage && (
              <button
                onClick={() => changePage(pagination.actualPage + 1)}
                className='icon'>
                <IconChevronCompactRight size={25} />
              </button>
            )}
          </section>
        </>
      )}
    </main>
  );
}
