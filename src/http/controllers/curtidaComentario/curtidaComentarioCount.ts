import { makeCurtidaComentarioCountUseCase } from "@/use-cases/factory/make-curtidacomentario-count-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function curtidaComentarioCount(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registreParamSchema = z.object({
        comentarioid: z.coerce.number()
    })
   
    const { comentarioid } = registreParamSchema.parse(request.params)    
    const curtidaComentarioCountUseCase = makeCurtidaComentarioCountUseCase()
    const count = await curtidaComentarioCountUseCase.handler(comentarioid)
    console.log('quantidade de curtidas no comentario ', count)    
    return reply.status(200).send({ count: count });
    
}