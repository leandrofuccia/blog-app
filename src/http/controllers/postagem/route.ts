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
  console.log('Registrando rota /posts');

  // Definição do esquema para a rota POST de criação
  const postagemSchema = {
    tags: ['Postagem'], // 🔹 Definindo a tag para agrupar as rotas de postagem
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
  

  // Esquema para query params
  const requestQuerySchema = z.object({
    page: z.string().optional().default("1"),  // Definindo valor padrão caso não informado
    limit: z.string().optional().default("10"), // Definindo valor padrão caso não informado
  });

  // Rota POST para criar postagem
  app.post('/posts', { schema: postagemSchema }, create);

  // Rota GET para buscar postagens por usuário
  console.log('Registrando rota /posts/usuario/:usuarioId');
  app.get('/posts/usuario/:usuarioId', { schema: { querystring: requestQuerySchema, tags: ['Postagem'] } }, findPostagemByUsuarioId);

  // Rota PUT para atualizar postagem
  console.log('Registrando rota /posts update');
  app.put('/posts/:id', { schema: postagemSchemaUpdate }, update);

  // Rota DELETE para excluir postagem
  console.log('Registrando rota /posts delete');
  app.delete('/posts/:id', { schema: { tags: ['Postagem'] } }, deletePostagem);

  // Rota GET para buscar postagem por ID
  console.log('Registrando rota /posts/id');
  app.get('/posts/:id', { schema: { tags: ['Postagem'] } }, findPostagemById);

  // Rota GET para buscar postagens por termo de pesquisa
  console.log('Registrando rota /posts/search');
  app.get('/posts/search/:termo', { schema: { querystring: requestQuerySchema, tags: ['Postagem'] } }, findPostagemBySearch);

  // Rota GET para listar todas as postagens
  console.log('Registrando rota /posts');
  app.get('/posts', { schema: { querystring: requestQuerySchema, tags: ['Postagem'] } }, findPostagem);
}
