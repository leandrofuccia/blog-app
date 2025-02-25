import { FastifyReply, FastifyRequest } from "fastify"

export async function validateJwt(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const routeFreeList = ['POST-/credencial', 'POST-/credencial/signin']
        const validateRoute = `${request.method}-${request.url}` // Remove o espaço ao redor do hífen

        console.log(validateRoute)
        
        if (routeFreeList.includes(validateRoute)) return

        await request.jwtVerify ()
        
    } catch (error) {
        reply.status(401).send({ message: 'Unauthorized' });
    }
}
