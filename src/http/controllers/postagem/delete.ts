import { InvalidUsuarioError } from "@/use-cases/errors/invalid-usuario-error"
import { unauthorizedPerfilError } from "@/use-cases/errors/unauthorized-perfil-error"
import { makeDeletePostagemUseCase } from "@/use-cases/factory/make-delete-postagem-use-case"
import { makeFindUsuarioByCredencialUseCase } from "@/use-cases/factory/make-find-usuario-by-credencial"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deletePostagem(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })

    const { username, credencialId } = request.user as { username: string; credencialId: number };
    const { id } = registreParamSchema.parse(request.params)
    const findUsuarioByCredencialIdUseCase = makeFindUsuarioByCredencialUseCase()
    const usuario = await findUsuarioByCredencialIdUseCase.handler(credencialId)
        
    if (!usuario || (usuario).length === 0){
        throw new InvalidUsuarioError()
    }

    if (usuario[0].perfilid !== 2) {
        throw new unauthorizedPerfilError()
    }

    const deletePostagemUseCase = makeDeletePostagemUseCase()
    await deletePostagemUseCase.handler(id);
    let mensagem = "OK"
    return reply.code(200).send({ message: mensagem });
    
}