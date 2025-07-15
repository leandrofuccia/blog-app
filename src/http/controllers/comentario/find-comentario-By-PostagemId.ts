import { makeFindComentarioByPostagemUseCase } from "@/use-cases/factory/make-find-comentario-by-postagem"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findComentarioByPostagemId(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        postagemId: z.coerce.number()
    })

    const registrerQuerySchema = z.object({
        page: z.coerce.number().optional(),
        limit: z.coerce.number().optional(),
    })
        
    const { page, limit } = registrerQuerySchema.parse(request.query)
    const pageNumber = page ?? 1
    const limitNumber = limit ?? 10
    const { postagemId } = registreParamSchema.parse(request.params)
    const findComentarioByPostagemUseCase = makeFindComentarioByPostagemUseCase()
    const comentario = await findComentarioByPostagemUseCase.handler(
        postagemId,
        pageNumber,
        limitNumber
    )
    return reply.status(200).send(comentario)
   
}