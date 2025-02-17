import { makeFindPostagemBySearchUseCase } from "@/use-cases/factory/make-find-postagem-by-search"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findPostagemBySearch(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registreParamSchema = z.object({
        termo: z.string()
    })

    const registrerQuerySchema = z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
    })

    const { termo } = registreParamSchema.parse(request.params)
    const { page, limit } = registrerQuerySchema.parse(request.query)

    const findPostagemBySearchUseCase = makeFindPostagemBySearchUseCase()

    const postagem = await findPostagemBySearchUseCase.handler(
        termo,
        page,
        limit
    )

    return reply.status(200).send(postagem)
    
}