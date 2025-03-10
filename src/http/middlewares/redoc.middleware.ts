
import path from 'path';
import redoc from 'redoc-express';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fastifyStatic from '@fastify/static';

export function setupRedoc(app: FastifyInstance) {
  const __dirname = path.resolve();

  const redocOptions = {
    title: 'BlogApp API',
    version: '1.0.0',
    specUrl: '/api-json',
  };

  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
  });

  app.get('/redoc', (req: FastifyRequest, reply: FastifyReply) => {
    reply.type('text/html').send(
      redoc({
        title: redocOptions.title,
        specUrl: redocOptions.specUrl,
      })
    );
  });
}
