import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";
import { Todo } from "../../entities/Todo";

class UpdateTodo {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(input: Input): Promise<Output> {
    const todo = new Todo(
      input.todoId,
      input.title,
      input.description,
      input.priority,
      input.completed,
      input.tag,
      input.date,
      input.hour
    );
    await this.connection.query(`UPDATE todos SET title = $1, description = $2,
    priority = $3, completed = $4, tag = $5, date = $6, hour = $7 WHERE todo_id = $8`,
      [todo.title, todo.description, todo.priority, todo.completed, todo.tag,
      todo.date, todo.hour, todo.todoId]);

    return {
      todoId: todo.todoId
    }
  }

}

type Input = {
  todoId: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  tag: string;
  date: Date;
  hour: string;
}

type Output = {
  todoId: string;
}

export { UpdateTodo }

