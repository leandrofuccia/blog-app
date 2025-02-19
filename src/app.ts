
import "reflect-metadata"
import '@/lib/typeorm/typeorm'
import fastify from 'fastify'
import { usuarioRoutes } from './http/controllers/usuario/route' // Caminho relativo ao arquivo atual
import { globalErrorHandler } from './utils/global-error-handler'
import postRoutes from './routes/postRoutes'
import { postagemRoutes } from './http/controllers/postagem/route'


export const app = fastify()

console.log('Registrando rota 1 /usuario') 
app.register(usuarioRoutes) // Prefixo opcional

console.log('Registrando rota 2 /postagem') 
app.register(postagemRoutes)

app.setErrorHandler(globalErrorHandler)







