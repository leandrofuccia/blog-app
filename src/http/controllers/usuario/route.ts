import { FastifyInstance } from "fastify"
import { create } from './create'

export async function usuarioRoutes(app: FastifyInstance) {
  console.log('Registrando rota /usuario')  
  app.post('/usuario', create)

}




