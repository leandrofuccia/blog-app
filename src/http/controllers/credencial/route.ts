
/*import { FastifyInstance } from "fastify"
import { create } from "./create"
import { signin } from "./signin"
import { z } from "zod"

export async function credencialRoutes(app: FastifyInstance) {
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
    },
  }

  app.post('/credencial', { schema: signinSchema }, create)
  
  app.post('/credencial/signin', { schema: signinSchema }, signin)
}
*/


import { FastifyInstance } from "fastify"
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
        id: z.string(),
        username: z.string().email(),
      }),
      400: z.object({
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
    },
  }

   app.post('/credencial', { schema: createCredencialSchema }, create)
  
  app.post('/credencial/signin', { schema: signinSchema }, signin)
}
