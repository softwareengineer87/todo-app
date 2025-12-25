import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";

class GetAllTodos {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(page: number): Promise<any> {
    const pageToNumber = Number(page);
    const limit = 10;
    const offset = (pageToNumber * limit) - limit;
    let lastPage: number = 1;
    const data = await this.connection.query(`SELECT * FROM todos
    LIMIT $1 OFFSET $2`, [limit, offset]);
    const items = await this.connection.query(`SELECT * FROM todos`, []);
    const totalItems = items.length;
    lastPage = Math.ceil(totalItems / limit);
    const totalPages: number = Math.ceil(totalItems / limit);
    let nextPage: number = pageToNumber + 1;
    if (nextPage > totalPages) {
      nextPage = totalPages;
    }
    console.log(nextPage);
    let prevPage: number = pageToNumber - 1;
    if (prevPage <= 1) {
      prevPage = 1;
    }
    const pagination: Pagination = {
      actualPage: pageToNumber,
      lastPage,
      totalItems,
      prevPage,
      nextPage,
      totalPages
    }

    return {
      data,
      pagination
    };
  }

}

type Pagination = {
  actualPage: number;
  lastPage: number;
  totalItems: number;
  prevPage: number;
  nextPage: number;
  totalPages: number;
}

export { GetAllTodos }

