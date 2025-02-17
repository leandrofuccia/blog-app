import { makeFindPostagemByIdUseCase } from "@/use-cases/factory/make-find-postagem-by-Id"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findPostagemById(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })

    const registrerQuerySchema = z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
    })

    const { id } = registreParamSchema.parse(request.params)
    const { page, limit } = registrerQuerySchema.parse(request.query)

    const findPostagemByIdUseCase = makeFindPostagemByIdUseCase()

    const postagem = await findPostagemByIdUseCase.handler(
        id,
        page,
        limit
    )

    return reply.status(200).send(postagem)
    
}