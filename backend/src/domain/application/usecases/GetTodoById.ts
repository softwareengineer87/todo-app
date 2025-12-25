import { DashboardRepository } from "../../../infra/repository/DashboardRepository";
import { Todo } from "../../entities/Todo";

class GetTodoById {

  constructor(readonly dashboardRepository: DashboardRepository) { }

  async execute(todoId: string): Promise<Todo> {
    return this.dashboardRepository.getTodoById(todoId);
  }

}

export { GetTodoById }

