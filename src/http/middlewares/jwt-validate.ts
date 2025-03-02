import { FastifyReply, FastifyRequest } from "fastify"

export async function validateJwt(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        //const routeFreeList = ['POST-/credencial', 'POST-/credencial/signin', 'GET-/documentation']
        const routeFreeList = [
            'POST-/credencial', 
            'POST-/credencial/signin', 
            'GET-/docs',
            'GET-/docs/json', // Adicionar esta rota
            'GET-/docs/static/swagger-ui.css',
            'GET-/docs/static/index.css',
            'GET-/docs/static/swagger-ui-standalone-preset.js',
            'GET-/docs/static/swagger-ui-bundle.js',
            'GET-/docs/static/swagger-initializer.js',
            'GET-/docs/static/favicon-32x32.png',
            'GET-/docs/static/favicon-16x16.png'
        ];
        
        const validateRoute = `${request.method}-${request.url}` // Remove o espaço ao redor do hífen

        console.log(validateRoute)
        
        if (routeFreeList.includes(validateRoute)) return

        await request.jwtVerify ()
        
    } catch (error) {
        reply.status(401).send({ message: 'Unauthorized' });
    }
}
