
export type Todo = {
  todo_id?: string;
  title: string;
  description: string;
  priority: string;
  completed?: boolean;
  tag: string;
  date: string;
  hour: string;
}

type Pagination = {
  actualPage: number;
  lastPage: number;
  totalItems: number;
}

export type Data = {
  data: Todo[];
  pagination: Pagination;
}

