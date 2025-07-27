/*import { FastifyReply, FastifyRequest } from "fastify"

export async function validateJwt(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const routeFreeList = [
            'POST-/credencial', 
            'POST-/credencial/signin',
            'GET-/posts', 
            'GET-/docs',
            'GET-/docs/json', 
            'GET-/docs/static/swagger-ui.css',
            'GET-/docs/static/index.css',
            'GET-/docs/static/swagger-ui-standalone-preset.js',
            'GET-/docs/static/swagger-ui-bundle.js',
            'GET-/docs/static/swagger-initializer.js',
            'GET-/docs/static/favicon-32x32.png',
            'GET-/docs/static/favicon-16x16.png'      
        ];
        
        const cleanUrl = request.url.split('?')[0];
        
        //const validateRoute = `${request.method}-${request.url}` 
        const validateRoute = `${request.method}-${cleanUrl}`;
        
        if (routeFreeList.includes(validateRoute)) return

        await request.jwtVerify ()

        const decoded = await request.jwtVerify();
        request.user = decoded as { username: string; credencialId: number };
                
    } catch (error) {
        reply.status(401).send({ message: 'Unauthorized' });
    }
}
*/

import { FastifyReply, FastifyRequest } from "fastify";

export async function validateJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Lista de rotas públicas usando expressões regulares
    const publicRoutes: RegExp[] = [
      /^PUT-\/credencial(\/[^\/]+)?$/,
      /^POST-\/credencial$/,
      /^POST-\/credencial\/signin$/,
      /^GET-\/posts(\/[^\/]+)?$/,
      /^GET-\/docs$/,
      /^GET-\/docs\/json$/,
      /^GET-\/docs\/static\/.*$/,
      /^PUT-\/usuario(\/[^\/]+)?$/,
      /^GET-\/comentario\/postagem(\/[^\/]+)?$/,
      /^GET-\/comentario\/count(\/[^\/]+)?$/,
    ];

    // Ignora query params
    const cleanUrl = request.url.split('?')[0];
    const routeIdentifier = `${request.method}-${cleanUrl}`;

    // Verifica se a rota atual é pública
    const isPublicRoute = publicRoutes.some((regex) => regex.test(routeIdentifier));

    if (isPublicRoute) return;

    // Verifica o JWT e adiciona o payload ao request
    const decoded = await request.jwtVerify();
    request.user = decoded as { username: string; credencialId: number };

  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized' });
  }
}
