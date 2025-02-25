import { FastifyInstance } from "fastify"
import { create } from './create'
import { findUsuarioByCredencialId } from "./find-Usuario-By-CredencialId"

export async function usuarioRoutes(app: FastifyInstance) {
  console.log('Registrando rota /usuario')  
  app.post('/usuario', create)
  console.log('Registrando rota /usuario/credencial/:credencialId')
  app.get('/usuario/credencial/:credencialId', findUsuarioByCredencialId)
 
}




