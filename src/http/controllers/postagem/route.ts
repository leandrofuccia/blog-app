import { FastifyInstance } from "fastify"
import { create } from './create'

import { deletePostagem } from "./delete"
import { findPostagemById } from "./find-postagem-By-Id"
import { findPostagemBySearch } from "./find-postagem-By-Search"
import { findPostagemByUsuarioId } from "./find-postagem-By-UsarioId"
import { findPostagem } from "./find-postagem"
import { update } from "./update"


export async function postagemRoutes(app: FastifyInstance) {
  console.log('Registrando rota /posts')  
  app.post('/posts', create)
  
  console.log('Registrando rota /posts/usuario/:usuarioId')
  app.get('/posts/usuario/:usuarioId', findPostagemByUsuarioId)
  
  console.log('Registrando rota /posts update')  
  app.put('/posts/:id', update)

  console.log('Registrando rota /posts delete')  
  app.delete ('/posts/:id', deletePostagem)

  console.log('Registrando rota /posts/id')  
  app.get ('/posts/:id', findPostagemById)

  console.log('Registrando rota /posts/search')  
  app.get ('/posts/search/:termo', findPostagemBySearch)

  console.log('Registrando rota /posts')  
  app.get ('/posts', findPostagem)


}
