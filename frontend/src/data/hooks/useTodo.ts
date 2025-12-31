import { Todo } from "@/models/Todo"
import { baseURL } from "@/utils/baseUrl";
import { useEffect, useState } from "react"

function useTodo() {

  const [message, setMessage] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  async function getTodos() {
    try {
      const response = await fetch(`${baseURL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveTodo(todo: Todo) {
    const changePriority = todo.priority === 'baixa' ? 'low' : todo.priority === 'media' ? 'medium' : 'high';
    try {
      const response = await fetch(`${baseURL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          priority: changePriority,
          tag: todo.tag,
          date: todo.date,
          hour: todo.hour
        })
      });
      const data = await response.json();
      if (data.statusCode === 500) {
        setMessage(data.message);
      }
      if (response.ok) {
        setMessage(data.message);
      }

      getTodos();

    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodo(todoId: string) {
    try {
      const response = await fetch(`${baseURL}/todos/${todoId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.statusCode === 500) {
        setMessage(data.message);
      }
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  async function changeCompleted(todoId: string) {
    try {
      const response = await fetch(`${baseURL}/todos/${todoId}`, {
        method: 'PUT'
      });
      const data = await response.json();
      if (data.statusCode === 500) {
        setMessage(data.message);
      }
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, [setTodos]);

  return {
    todos,
    saveTodo,
    getTodos,
    setTodos,
    deleteTodo,
    changeCompleted,
    message
  }

}

export { useTodo }

