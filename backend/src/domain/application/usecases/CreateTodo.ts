import { DashboardRepository } from "../../../infra/repository/DashboardRepository";
import { Todo } from "../../entities/Todo";

class CreateTodo {

  constructor(readonly dashboardRepository: DashboardRepository) { }

  async execute(input: Input): Promise<Output> {
    const todo = Todo.create(
      input.title,
      input.description,
      input.priority,
      input.tag,
      input.date,
      input.hour,
      input.isRecurring,
      input.recurringDates
    );

    this.dashboardRepository.createTodo(todo);

    return {
      todoId: todo.todoId
    }
  }

}

export { CreateTodo }

type Input = {
  title: string;
  description: string;
  priority: string;
  tag: string;
  date: Date;
  hour: string;
  isRecurring: boolean;
  recurringDates: string[];
}

type Output = {
  todoId: string;
}
