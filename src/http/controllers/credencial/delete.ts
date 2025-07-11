
import { makeDeleteCredencialUseCase } from "@/use-cases/factory/make-delete-credencial-use-case";
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteCredencial(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registreParamSchema.parse(request.params)
   
    const deleteCredencialUseCase = makeDeleteCredencialUseCase()
    await deleteCredencialUseCase.handler(id);
    let mensagem = "OK"
    return reply.code(200).send({ message: mensagem });
    
}