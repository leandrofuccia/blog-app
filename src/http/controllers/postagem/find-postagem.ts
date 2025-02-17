import { makeFindPostagemUseCase } from "@/use-cases/factory/make-find-postagem"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findPostagem(
    request: FastifyRequest,
    reply: FastifyReply,
) {
        
    const registrerQuerySchema = z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
    })
    
    
    const { page, limit } = registrerQuerySchema.parse(request.query)
    
    const findPostagemUseCase = makeFindPostagemUseCase()

    const postagem = await findPostagemUseCase.handler(
        page,
        limit
    )

    return reply.status(200).send(postagem)
    
}