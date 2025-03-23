import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePostagem } from "./delete";
import { findPostagemById } from "./find-postagem-By-Id";
import { findPostagemBySearch } from "./find-postagem-By-Search";
import { findPostagemByUsuarioId } from "./find-postagem-By-UsarioId";
import { findPostagem } from "./find-postagem";
import { update } from "./update";
import { z } from "zod";

export async function postagemRoutes(app: FastifyInstance) {
  const postagemSchema = {
    tags: ['Postagem'],
    body: z.object({
      titulo: z.string(),
      conteudo: z.string(),
      usuarioid: z.coerce.number(),
    }),
    response: {
      200: z.object({
        token: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  };

  const postagemSchemaUpdate = {
    tags: ['Postagem'],
    body: z.object({
      titulo: z.string(),
      conteudo: z.string(),      
    }),
    response: {
      200: z.object({
        id: z.number(),
        titulo: z.string(),
        conteudo: z.string(),
        usuarioid: z.number(),
        datacriacao: z.union([z.date(), z.string()]), 
        dataatualizacao: z.union([z.date(), z.string()]),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  };

  const requestQuerySchema = z.object({
    page: z.string().optional().default("1"),  
    limit: z.string().optional().default("10"), 
  });

  app.post('/posts', { schema: postagemSchema }, create);
  app.get('/posts/usuario/:usuarioId', { schema: { querystring: requestQuerySchema, tags: ['Postagem'] } }, findPostagemByUsuarioId);
  app.put('/posts/:id', { schema: postagemSchemaUpdate }, update);
  app.delete('/posts/:id', { schema: { tags: ['Postagem'] } }, deletePostagem);
  app.get('/posts/:id', { schema: { tags: ['Postagem'] } }, findPostagemById);
  app.get('/posts/search/:termo', { schema: { querystring: requestQuerySchema, tags: ['Postagem'] } }, findPostagemBySearch);
  app.get('/posts', { schema: { querystring: requestQuerySchema, tags: ['Postagem'] } }, findPostagem);
}
