import { makeCurtidaCountUseCase } from "@/use-cases/factory/make-curtida-count-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function curtidaCount(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registreParamSchema = z.object({
        postagemId: z.coerce.number()
    })
   
    const { postagemId } = registreParamSchema.parse(request.params)    
    const curtidaCountUseCase = makeCurtidaCountUseCase()
    const count = await curtidaCountUseCase.handler(postagemId)
    console.log('quantidade de curtidas ', count)    
    return reply.status(200).send({ count: count });
    
}