import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes';
import { PgPromiseAdapter } from '../database/PgPromiseAdapter';
import createSql from '../database/create.sql';
import fastifyMultipart from '@fastify/multipart';

const app = Fastify();

app.register(cors, {
  origin: [
    'http://localhost:3000'
  ],
  methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS']
});

const connection = new PgPromiseAdapter();
app.register(routes, connection);
app.register(fastifyMultipart);
connection.executeScript('../database/create.sql');
//connection.query(createSql, []).catch(console.error);

app.listen({
  port: Number(process.env.PORT) || 3333,
  //host: '0.0.0.0'
},
  (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`server running on http://localhost/3333`);
  });

