import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";
import { Pagination } from "../../Pagination";

class GetAllTodos {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(page: number): Promise<any> {
    const items = await this.connection.query(`SELECT * FROM todos`, []);
    const limit: number = 10;
    const pagination = new Pagination(limit);
    pagination.paginator(page, items);

    const data = await this.connection.query(`SELECT * FROM todos
    LIMIT $1 OFFSET $2`, [pagination.limit, pagination.offset]);

    return {
      data,
      pagination
    };
  }

}

export { GetAllTodos }

