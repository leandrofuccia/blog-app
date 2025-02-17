import { FastifyInstance } from "fastify"
import { create } from './create'
import { update } from "./update"
import { deletePostagem } from "./delete"
import { findPostagemById } from "./find-postagem-By-Id"
import { findPostagemBySearch } from "./find-postagem-By-Search"
import { findPostagemByUsuarioId } from "./find-postagem-By-UsarioId"
import { findPostagem } from "./find-postagem"


export async function postagemRoutes(app: FastifyInstance) {
  console.log('Registrando rota /postagem')  
  app.post('/postagem', create)
  
  console.log('Registrando rota /postagem/usuario/:usuarioId')
  app.get('/postagem/usuario/:usuarioId', findPostagemByUsuarioId)
  
  console.log('Registrando rota /postagem update')  
  app.put('/postagem/:id', update)

  console.log('Registrando rota /postagem delete')  
  app.delete ('/postagem/:id', deletePostagem)

  console.log('Registrando rota /postagem/id')  
  app.get ('/postagem/:id', findPostagemById)

  console.log('Registrando rota /postagem/search')  
  app.get ('/postagem/search/:termo', findPostagemBySearch)

  console.log('Registrando rota /postagem')  
  app.get ('/postagem', findPostagem)


}
