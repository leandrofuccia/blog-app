import { FastifyInstance } from "fastify"
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