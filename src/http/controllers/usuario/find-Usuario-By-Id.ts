import { makeFindUsuarioByIdUseCase } from "@/use-cases/factory/make-find-usuario-by-Id"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findUsuarioById(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        usuarioId: z.coerce.number()
    })
 
    const { usuarioId } = registreParamSchema.parse(request.params)
    const findUsuarioByIdUseCase = makeFindUsuarioByIdUseCase()
    const usuario = await findUsuarioByIdUseCase.handler(usuarioId)
    return reply.status(200).send(usuario)
   
}

