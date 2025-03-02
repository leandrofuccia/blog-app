
import "reflect-metadata"
import '@/lib/typeorm/typeorm'
import fastify from 'fastify'
import { usuarioRoutes } from './http/controllers/usuario/route' // Caminho relativo ao arquivo atual
import { globalErrorHandler } from './utils/global-error-handler'
import { postagemRoutes } from './http/controllers/postagem/route'
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"
import { validateJwt } from "./http/middlewares/jwt-validate"
import { credencialRoutes } from "./http/controllers/credencial/route"

/*import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
*/
import fastifySwagger from '@fastify/swagger';
import {jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler
  } from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui"


export const app = fastify()


/*app.register(fastifySwagger, {
    mode: 'dynamic',
    openapi: {
      info: {
        title: 'Minha API',
        description: 'Descrição da API',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:3002',
          description: 'Servidor Local'
        }
      ],
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
    }
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true
  });
*/

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


/*import "reflect-metadata";
import '@/lib/typeorm/typeorm';
import fastify from 'fastify';
import { usuarioRoutes } from './http/controllers/usuario/route';
import { globalErrorHandler } from './utils/global-error-handler';
import { postagemRoutes } from './http/controllers/postagem/route';
import fastifyJwt from "@fastify/jwt";
import { env } from "./env';
import { validateJwt } from "./http/middlewares/jwt-validate';
import { credencialRoutes } from './http/controllers/credencial/route';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export const app = fastify();

app.register(fastifySwagger, {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'Minha API',
      description: 'Descrição da API',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local'
      }
    ]
  }
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '10m' }
});

app.addHook('onRequest', validateJwt);

console.log('Registrando rota 1 /usuario');
app.register(usuarioRoutes);

console.log('Registrando rota 2 /postagem');
app.register(postagemRoutes);

console.log('Registrando rota 3 /credencial');
app.register(credencialRoutes);

app.setErrorHandler(globalErrorHandler);

const start = async () => {
  try {
    await app.listen(3000);
    app.log.info(`Server is running at http://localhost:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
*/