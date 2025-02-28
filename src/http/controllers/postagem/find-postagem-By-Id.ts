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
   
    const { id } = registreParamSchema.parse(request.params)
    
    const findPostagemByIdUseCase = makeFindPostagemByIdUseCase()

    const postagem = await findPostagemByIdUseCase.handler(id)
    
    return reply.status(200).send(postagem)
    
}