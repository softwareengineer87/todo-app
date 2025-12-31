import { v4 as uuidv4 } from 'uuid';

class Todo {

  todoId: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  tag: string;
  date: Date;
  hour: string;

  constructor(
    todoId: string,
    title: string,
    description: string,
    priority: string,
    completed: boolean,
    tag: string,
    date: Date,
    hour: string
  ) {

    if (title === undefined) {
      throw new Error('O titulo é obrigatório.');
    }

    if (description === undefined) {
      throw new Error('A descrição é obrigatória.');
    }
    if (priority === undefined) {
      throw new Error('A prioridade é obrigatória.');
    }
    if (date === undefined) {
      throw new Error('A data é obrigatória.');
    }
    if (hour === undefined || hour === '') {
      throw new Error('A hora é obrigatória.');
    }

    this.todoId = todoId;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.completed = completed;
    this.tag = tag;
    this.date = date;
    this.hour = hour;
  }

  static create(
    title: string,
    description: string,
    priority: string,
    tag: string,
    date: Date,
    hour: string
  ) {
    const todoId = uuidv4();
    const completed = false;
    return new Todo(
      todoId,
      title,
      description,
      priority,
      completed,
      tag,
      date,
      hour
    );
  }

  completedTask() {
    this.completed = !this.completed;
  }

  checkExpiration() {
    const now = new Date().getTime();
    const isExpiration = this.date.getTime() < now;
    return isExpiration;
  }

}

export { Todo }

