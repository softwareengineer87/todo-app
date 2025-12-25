import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DatabaseConnection, PgPromiseAdapter } from "../database/PgPromiseAdapter";
import { DashboardRepositoryDatabase } from "../repository/DashboardRepository";
import { CreateTodo } from "../../domain/application/usecases/CreateTodo";
import { GetTodoById } from "../../domain/application/usecases/GetTodoById";
import { GetAllTodos } from "../../domain/application/usecases/GetAllTodos";
import { CompletedTask } from "../../domain/application/usecases/CompletedTask";
import { DeleteTodo } from "../../domain/application/usecases/DeleteTodo";
import { Search } from "../../domain/application/usecases/Search";

function routes(fastify: FastifyInstance, connection: DatabaseConnection) {

  const dashoardRepository = new DashboardRepositoryDatabase(connection);
  const createTodo = new CreateTodo(dashoardRepository);
  const getTodoById = new GetTodoById(dashoardRepository);
  const getAllTodos = new GetAllTodos(connection);
  const completedTask = new CompletedTask(dashoardRepository);
  const deleteTodo = new DeleteTodo(connection);
  const searchQuery = new Search(connection);

  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    try {
      reply.code(200).send({ ok: true, test: 'ok' });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.post('/todos', async (request: FastifyRequest, reply: FastifyReply) => {

    try {
      const { title, description, priority, tag, date
      } = request.body as {
        title: string,
        description: string,
        priority: string,
        tag: string,
        date: Date
      };
      const inputTodo = {
        title,
        description,
        priority,
        tag,
        date
      }
      const { todoId } = await createTodo.execute(inputTodo);

      reply.code(201).send({
        todoId,
        message: 'Tarefa cadastrada com sucesso!'
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/todos/:todo_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { todo_id } = request.params as { todo_id: string };
      const todo = await getTodoById.execute(todo_id);
      reply.code(200).send(todo);
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/todos', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { page = 1 } = request.query as { page: number };
      const { data, pagination } = await getAllTodos.execute(page);
      reply.code(200).send({
        data,
        pagination
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.put('/todos/:todo_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { todo_id } = request.params as { todo_id: string };
      const { todoId } = await completedTask.execute(todo_id);
      reply.code(201).send({
        todoId,
        message: 'Tarefa completa'
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.delete('/todos/:todo_id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { todo_id } = request.params as { todo_id: string };
      await deleteTodo.execute(todo_id);
      reply.code(201).send({
        message: 'Tarefa deletada com sucesso!'
      });
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

  fastify.get('/todos/search', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { search } = request.query as { search: string };
      const todo = await searchQuery.execute(search);
      reply.code(201).send(todo);
    } catch (error) {
      console.log(`Erro no servidor: ${error}`);
      reply.code(500).send(error);
    }
  });

}

export { routes }


