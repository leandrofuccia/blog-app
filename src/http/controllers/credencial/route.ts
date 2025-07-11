
/*import { FastifyInstance } from "fastify"
import { create } from "./create"
import { signin } from "./signin"
import { z } from "zod"

export async function credencialRoutes(app: FastifyInstance) {
  // Schema para criação de credencial
  const createCredencialSchema = {
    tags: ["Credencial"],
    body: z.object({
      username: z.string().email(),
      password: z.string().min(4),
    }),
    response: {
      201: z.object({
        id: z.union([z.string(), z.number()]),
        username: z.string().email(),
      }),
      500: z.object({
        message: z.string(),
        code: z.string(),
      }),
      409: z.object({
        message: z.string(),
        code: z.string(),
      }),
    },
  }

  const signinSchema = {
    tags: ["Credencial"], 
    body: z.object({
      username: z.string().email(),
      password: z.string().min(4),
    }),
    response: {
      200: z.object({
        token: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
      500: z.object({
        message: z.string(),
      }),
    },
  }

   app.post('/credencial', { schema: createCredencialSchema }, create)
  
  app.post('/credencial/signin', { schema: signinSchema }, signin)
}
*/


import { FastifyInstance } from "fastify";
import { create } from "./create";
import { signin } from "./signin";
import { z } from "zod";
import { update } from "./update";
import { deleteCredencial } from "./delete";

export async function credencialRoutes(app: FastifyInstance) {
  //Schema para criação de credencial
  const createCredencialSchema = {
    tags: ["Credencial"],
    body: z.object({
      username: z.string().email("Formato inválido! Insira um e-mail válido."),
      password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres."),
    }),
    response: {
      201: z.object({
        id: z.union([z.string(), z.number()]),
        username: z.string().email(),
      }),
      400: z.object({
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

  //Schema para login (signin)
  const signinSchema = {
    tags: ["Credencial"],
    body: z.object({
      username: z.string().email("Formato inválido! Insira um e-mail válido."),
      password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres."),
    }),
    response: {
      200: z.object({
        token: z.string(),
      }),
      400: z.object({
        message: z.string(),
       
      }),
      401: z.object({
        message: z.string(),
        
      }),
      404: z.object({
        message: z.string(),
        
      }),
      500: z.object({
        message: z.string(),
        code: z.string().optional(),
      }),
    },
  };

  const credencialSchemaUpdate = {
    tags: ['Credencial'],
    body: z.object({
      username: z.string(),
      password: z.string(),      
    }),
    response: {
      200: z.object({
        id: z.number(),
        username: z.string(),
        password: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  };

  //Definição das rotas
  app.post("/credencial", { schema: createCredencialSchema }, create);
  app.post("/credencial/signin", { schema: signinSchema }, signin);
  app.put("/credencial/:id", { schema: credencialSchemaUpdate }, update);
  app.delete('/credencial/:id', { schema: { tags: ['Credencial'] } }, deleteCredencial);

  //Tratamento global de erros para capturar falhas de validação antes do controller
  app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      const menssage = error.message.replace('body/username ', '');
      return reply.status(400).send({ message: "Erro de validação: " + menssage });
    }
    console.error("Erro inesperado:", error);
    return reply.status(500).send({ message: "Erro interno no servidor." });
  });
}