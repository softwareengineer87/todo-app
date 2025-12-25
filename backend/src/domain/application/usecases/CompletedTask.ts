import { DashboardRepository } from "../../../infra/repository/DashboardRepository";

class CompletedTask {

  constructor(readonly dashboardRepository: DashboardRepository) { }

  async execute(todoId: string): Promise<Output> {
    const todo = await this.dashboardRepository.getTodoById(todoId);
    if (!todo) {
      throw new Error('Tarefa não encontrada.');
    }

    todo.completedTask();
    this.dashboardRepository.completedTask(todo.completed, todoId);

    return {
      todoId
    }

  }

}

export { CompletedTask }

type Output = {
  todoId: string;
}

