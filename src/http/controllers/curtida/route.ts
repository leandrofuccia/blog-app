import { FastifyInstance } from "fastify";
import { z } from "zod";
import { create } from "./create";
import { deleteCurtida } from "./delete";
import { curtidaCount } from "./curtidaCount";
import { curtidaStatus } from "./curtidastatus";


export async function curtidaRoutes(app: FastifyInstance) {

  const createCurtidaSchema = {
  tags: ["Curtida"],
  params: z.object({
    postid: z.coerce.number(),
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

const statusCurtidaSchema = {
  tags: ["Curtida"],
  params: z.object({
    postid: z.coerce.number(),
  }),
  querystring: z.object({
    usuarioid: z.coerce.number(),
  }),
  
  response: {
    200: z.object({
      status: z.boolean(),
    }),
    
  },
};


const deleteCurtidaSchema = {
  tags: ["Curtida"],
  params: z.object({
    postid: z.coerce.number(),
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
  
  app.post("/curtida/:postid", { schema: createCurtidaSchema }, create);
  app.get('/curtida/count/:postagemId', { schema: { tags: ['Curtida'] } }, curtidaCount);
  app.get('/curtida/status/:postid', { schema: statusCurtidaSchema }, curtidaStatus);
  app.delete('/curtida/:postid', { schema: deleteCurtidaSchema }, deleteCurtida);
}