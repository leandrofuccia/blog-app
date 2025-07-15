import { InvalidUsuarioError } from "@/use-cases/errors/invalid-usuario-error"
import { unauthorizedPerfilError } from "@/use-cases/errors/unauthorized-perfil-error"
import { makeDeleteComentarioUseCase } from "@/use-cases/factory/make-delete-comentario-use-case"
import { makeDeletePostagemUseCase } from "@/use-cases/factory/make-delete-postagem-use-case"
import { makeFindUsuarioByCredencialUseCase } from "@/use-cases/factory/make-find-usuario-by-credencial"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteComentario(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })
    
    const { id } = registreParamSchema.parse(request.params)
    const deleteComentarioUseCase = makeDeleteComentarioUseCase()
    await deleteComentarioUseCase.handler(id);
    let mensagem = "OK"
    return reply.code(200).send({ message: mensagem });
    
}