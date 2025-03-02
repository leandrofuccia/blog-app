import { FastifyInstance } from "fastify"
import { create } from "./create"
import { signin } from "./signin"


/*export async function credencialRoutes(app: FastifyInstance) {
  console.log('Registrando rota /credencial')  
  app.post('/credencial', create)
  app.post('/credencial/signin', signin)

}
*/

import { z } from "zod"

export async function credencialRoutes(app: FastifyInstance) {
  console.log('Registrando rota /credencial') 
  
  // Definição explícita do esquema do Swagger
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



