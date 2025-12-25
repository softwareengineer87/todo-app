import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";
import { Todo } from "../../entities/Todo";

class Search {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(search: string): Promise<Todo[]> {
    return await this.connection.query(`SELECT * FROM todos 
    WHERE title LIKE $1`, ['%' + search + '%']);
  }

}

export { Search }

