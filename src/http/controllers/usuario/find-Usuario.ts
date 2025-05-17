import { makeFindUsuarioUseCase } from "@/use-cases/factory/make-find-usuario"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findUsuario(
    request: FastifyRequest,
    reply: FastifyReply,
) {
        
    const registrerQuerySchema = z.object({
        page: z.coerce.number().optional(),
        limit: z.coerce.number().optional(),
    })

    const { page, limit } = registrerQuerySchema.parse(request.query)
    const pageNumber = page ?? 1
    const limitNumber = limit ?? 10
    const findUsuarioUseCase = makeFindUsuarioUseCase()
    const usuario = await findUsuarioUseCase.handler(
        pageNumber,
        limitNumber
    )
    return reply.status(200).send(usuario)
}