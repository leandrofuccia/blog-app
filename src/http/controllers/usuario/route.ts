import { FastifyInstance } from "fastify"
import { create } from './create'
import { findUsuarioByCredencialId } from "./find-Usuario-By-CredencialId"
import { z } from "zod"
import { findUsuarioById } from "./find-Usuario-By-Id"

export async function usuarioRoutes(app: FastifyInstance) {
  console.log('Registrando rota /usuario')  

// Definição explícita do esquema do Swagger

  const signinSchema = {
    tags: ["Usuário"], 
    body: z.object({
      nome: z.string(),
      perfilid: z.coerce.number(),
      credencialId: z.coerce.number(),
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

 
  app.post('/usuario', { schema: signinSchema }, create)
  console.log('Registrando rota /usuario/credencial/:credencialId')
  app.get('/usuario/credencial/:credencialId', { schema: { tags: ['Usuário'] } },  findUsuarioByCredencialId)
  app.get('/usuario/:usuarioId', { schema: { tags: ['Usuário'] } }, findUsuarioById)
 
}




