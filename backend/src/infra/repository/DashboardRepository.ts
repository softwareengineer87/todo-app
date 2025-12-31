import { Todo } from "../../domain/entities/Todo";
import { DatabaseConnection } from "../database/PgPromiseAdapter";

interface DashboardRepository {
  createTodo(todo: Todo): void;
  getTodoById(todoId: string): Promise<Todo>;
  completedTask(completed: boolean, todoId: string): void;
}

class DashboardRepositoryDatabase implements DashboardRepository {

  constructor(readonly connection: DatabaseConnection) { }

  async createTodo(todo: Todo): Promise<void> {
    await this.connection.query(`INSERT INTO todos 
      (todo_id, title, description, priority, completed, tag, date, hour)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [todo.todoId, todo.title, todo.description,
      todo.priority, todo.completed, todo.tag, todo.date, todo.hour]);
  }

  async getTodoById(todoId: string): Promise<Todo> {
    const [todo] = await this.connection.query(`SELECT * FROM todos
    WHERE todo_id = $1`, [todoId]);

    return new Todo(
      todo.todoId,
      todo.title,
      todo.description,
      todo.priority,
      todo.completed,
      todo.tag,
      todo.date,
      todo.hour
    );
  }

  async completedTask(completed: boolean, todoId: string): Promise<void> {
    await this.connection.query(`UPDATE todos SET completed = $1
    WHERE todo_id = $2`, [completed, todoId]);
  }

}

export {
  DashboardRepository,
  DashboardRepositoryDatabase
}

