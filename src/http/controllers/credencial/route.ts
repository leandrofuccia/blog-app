import { FastifyInstance } from "fastify"
import { create } from "./create"
import { signin } from "./signin"


export async function credencialRoutes(app: FastifyInstance) {
  console.log('Registrando rota /credencial')  
  app.post('/credencial', create)
  app.post('/credencial/signin', signin)

}




