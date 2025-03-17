import { unauthorizedPerfilError } from "@/use-cases/errors/unauthorized-perfil-error"
import { makeDeletePostagemUseCase } from "@/use-cases/factory/make-delete-postagem-use-case"
import { makeFindUsuarioByIdUseCase } from "@/use-cases/factory/make-find-usuario-by-Id"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deletePostagem(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
 
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })

    const { username, usuarioId } = request.user as { username: string; usuarioId: number };


    console.log("Username decodificado:", username);
    console.log("Usuario ID decofificado:", usuarioId);   


    const { id } = registreParamSchema.parse(request.params)

    const findByUserIdUseCase = makeFindUsuarioByIdUseCase()  
    const usuario = await findByUserIdUseCase.handler(usuarioId)
    console.log("Perfil ",  usuario.perfilid)    
    if (usuario.perfilid !== 2) {
        throw new unauthorizedPerfilError()
    }

    const deletePostagemUseCase = makeDeletePostagemUseCase()

    await deletePostagemUseCase.handler(id)  
    
    return reply.code(204).send();
    
}