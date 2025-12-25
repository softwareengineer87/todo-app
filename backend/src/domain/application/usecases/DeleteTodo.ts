import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";

class DeleteTodo {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(todoId: string): Promise<void> {
    await this.connection.query('DELETE FROM todos WHERE todo_id = $1', [todoId]);
  }

}

export { DeleteTodo }

