
import { makeDeleteUsuarioUseCase } from "@/use-cases/factory/make-delete-usuario-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteUsuario(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registreParamSchema.parse(request.params)
   
    const deleteUsuarioUseCase = makeDeleteUsuarioUseCase()
    await deleteUsuarioUseCase.handler(id);
    let mensagem = "OK"
    return reply.code(200).send({ message: mensagem });
    
}