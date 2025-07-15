import { FastifyInstance } from "fastify";
import { z } from "zod";
import { create } from "./create";
import { findComentarioByPostagemId } from "./find-comentario-By-PostagemId";
import { deleteComentario } from "./delete";
import { comentarioCount } from "./comentarioCount";

export async function comentarioRoutes(app: FastifyInstance) {
  const comentarioSchema = {
    tags: ['Comentario'],
    body: z.object({
      usuarioid: z.coerce.number().optional(),
      nome_autor: z.string(),
      conteudo: z.string(),
      
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

  const requestQuerySchema = z.object({
    page: z.string().optional().default("1"),  
    limit: z.string().optional().default("10"), 
  });

  app.post('/comentario/:postid', { schema: comentarioSchema }, create);
  app.get('/comentario/postagem/:postagemId', { schema: { querystring: requestQuerySchema, tags: ['Comentario'] } }, findComentarioByPostagemId);
  app.delete('/comentario/:id', { schema: { tags: ['Comentario'] } }, deleteComentario);
  app.get('/comentario/count/:postagemId', { schema: { tags: ['Comentario'] } }, comentarioCount);
}
