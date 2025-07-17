import { FastifyInstance } from "fastify";
import { z } from "zod";
import { create } from "./create";
import { deleteCurtidaComentario } from "./delete";
import { curtidaComentarioCount } from "./curtidaComentarioCount";
import { curtidaComentarioStatus } from "./curtidaComentarioStatus";


export async function curtidaComentarioRoutes(app: FastifyInstance) {

  const createCurtidaComentarioSchema = {
  tags: ["Curtida Comentario"],
  params: z.object({
    comentarioid: z.coerce.number(),
  }),
  body: z.object({
    usuarioid: z.coerce.number(),
  }),
  response: {
    201: z.object({
      id: z.number(),
      datacriacao: z.union([z.date(), z.string()]),   
      
    }),
    401: z.object({
      message: z.string(),
    }),
    409: z.object({
      message: z.string(),
    }),
    500: z.object({
      message: z.string(),
      code: z.string().optional(),
    }),
  },
};

const deleteCurtidaComentarioSchema = {
  tags: ["Curtida Comentario"],
  params: z.object({
    comentarioid: z.coerce.number(),
  }),
  querystring: z.object({
    usuarioid: z.coerce.number(),
  }),
  
  response: {
    200: z.object({
      message: z.string(),
    }),
    
  },
};

const statusCurtidaComentarioSchema = {
  tags: ["Curtida Comentario"],
  params: z.object({
    comentarioid: z.coerce.number(),
  }),
  querystring: z.object({
    usuarioid: z.coerce.number(),
  }),
  
  response: {
    200: z.object({
      curtiu: z.boolean(),
    }),
    
  },
};

  app.post("/curtidaComentario/:comentarioid", { schema: createCurtidaComentarioSchema }, create);
  app.delete('/curtidaComentario/:comentarioid', { schema: deleteCurtidaComentarioSchema }, deleteCurtidaComentario);
  app.get('/curtidaComentario/count/:comentarioid', { schema: { tags: ['Curtida Comentario'] } }, curtidaComentarioCount);
  app.get('/curtidaComentario/status/:comentarioid', { schema: statusCurtidaComentarioSchema }, curtidaComentarioStatus);
}