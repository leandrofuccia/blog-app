import { makeComentarioCountUseCase } from "@/use-cases/factory/make-comentario-count-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function comentarioCount(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registreParamSchema = z.object({
        postagemId: z.coerce.number()
    })
   
    const { postagemId } = registreParamSchema.parse(request.params)
    
    const comentarioCountUseCase = makeComentarioCountUseCase()

    const count = await comentarioCountUseCase.handler(postagemId)

    console.log('quantidade de comentario ', count)
    
    return reply.status(200).send(count)
    
}