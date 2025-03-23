import { makeFindPostagemByUsuarioUseCase } from "@/use-cases/factory/make-find-postagem-by-usuario"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findPostagemByUsuarioId(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        usuarioId: z.coerce.number()
    })

    const registrerQuerySchema = z.object({
        page: z.coerce.number().optional(),
        limit: z.coerce.number().optional(),
    })
        
    const { page, limit } = registrerQuerySchema.parse(request.query)
    const pageNumber = page ?? 1
    const limitNumber = limit ?? 10
    const { usuarioId } = registreParamSchema.parse(request.params)
    const findPostagemByUsuarioUseCase = makeFindPostagemByUsuarioUseCase()
    const postagem = await findPostagemByUsuarioUseCase.handler(
        usuarioId,
        pageNumber,
        limitNumber
    )
    return reply.status(200).send(postagem)
   
}