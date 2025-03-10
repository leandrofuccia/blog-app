
import "reflect-metadata"
import '@/lib/typeorm/typeorm'
import fastify from 'fastify'
import { usuarioRoutes } from './http/controllers/usuario/route' 
import { globalErrorHandler } from './utils/global-error-handler'
import { postagemRoutes } from './http/controllers/postagem/route'
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"
import { validateJwt } from "./http/middlewares/jwt-validate"
import { credencialRoutes } from "./http/controllers/credencial/route"


import fastifySwagger from '@fastify/swagger';
import {jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler
  } from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui"
import { setupRedoc } from "./http/middlewares/redoc.middleware"


export const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'BlogApp',
      description: 'Documentação API BlogApp',
      version: '1.0.0',
    },

    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

setupRedoc(app);
  
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {expiresIn: '10m'},
})




app.addHook('onRequest', validateJwt)

console.log('Registrando rota 1 /usuario') 
app.register(usuarioRoutes) 

console.log('Registrando rota 2 /postagem') 
app.register(postagemRoutes)

console.log('Registrando rota 2 /credencial') 
app.register(credencialRoutes)

app.setErrorHandler(globalErrorHandler)