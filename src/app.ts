
import "reflect-metadata"
import '@/lib/typeorm/typeorm'
import fastify from 'fastify'
import { usuarioRoutes } from './http/controllers/usuario/route' // Caminho relativo ao arquivo atual
import { globalErrorHandler } from './utils/global-error-handler'
import postRoutes from './routes/postRoutes'
import { postagemRoutes } from './http/controllers/postagem/route'
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"
import { validateJwt } from "./http/middlewares/jwt-validate"
import { credencialRoutes } from "./http/controllers/credencial/route"



export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {expiresIn: '10m'},
})

app.addHook('onRequest', validateJwt)

console.log('Registrando rota 1 /usuario') 
app.register(usuarioRoutes) // Prefixo opcional

console.log('Registrando rota 2 /postagem') 
app.register(postagemRoutes)

console.log('Registrando rota 2 /credencial') 
app.register(credencialRoutes)

app.setErrorHandler(globalErrorHandler)







