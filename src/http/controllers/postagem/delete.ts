import { makeDeletePostagemUseCase } from "@/use-cases/factory/make-delete-postagem-use-case"
import { makeFindPostagemByUsuarioUseCase } from "@/use-cases/factory/make-find-postagem-by-usuario"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deletePostagem(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registreParamSchema.parse(request.params)

    const deletePostagemUseCase = makeDeletePostagemUseCase()

    await deletePostagemUseCase.handler(id)  
    
    return reply.status(204).send()
    
}