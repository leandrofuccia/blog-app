import { FastifyInstance } from "fastify"
import { create } from './create'
import { findUsuarioByCredencialId } from "./find-Usuario-By-CredencialId"
import { z } from "zod"
import { findUsuarioById } from "./find-Usuario-By-Id"
import { findUsuario } from "./find-Usuario"
import { update } from "./update"
import { deleteUsuario } from "./delete"

export async function usuarioRoutes(app: FastifyInstance) {

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

  const signinUpdateSchema = {
  tags: ["Usuário"],
  body: z.object({
    nome: z.string(),
    perfilid: z.coerce.number(),
  }),
  response: {
    200: z.object({
      id: z.number(),
      nome: z.string(),
      perfilid: z.number(),
      credencialId: z.number(),
    }),
    400: z.object({
      message: z.string(),
    }),
  },
};


  app.post('/usuario', { schema: signinSchema }, create)
  app.get('/usuario/credencial/:credencialId', { schema: { tags: ['Usuário'] } },  findUsuarioByCredencialId)
  app.get('/usuario/:usuarioId', { schema: { tags: ['Usuário'] } }, findUsuarioById)
  app.get('/usuario', { schema: { tags: ['Usuário'] } }, findUsuario)
  app.put('/usuario/:usuarioId', { schema: signinUpdateSchema }, update)
  app.delete('/usuario/:id', { schema: { tags: ['Usuário'] } }, deleteUsuario);
}




