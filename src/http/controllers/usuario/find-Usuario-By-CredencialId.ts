import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeFindUsuarioByCredencialUseCase } from "@/use-cases/factory/make-find-usuario-by-credencial"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findUsuarioByCredencialId(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registreParamSchema = z.object({
        credencialId: z.coerce.number()
    })
 
    const { credencialId } = registreParamSchema.parse(request.params)
    const findPostagemByUsuarioUseCase = makeFindUsuarioByCredencialUseCase()
    console.log ('Chamando a função handler')
    const usuario = await findPostagemByUsuarioUseCase.handler(credencialId)

    if (!usuario || (usuario).length === 0) {
        throw new ResourceNotFoundError();
    }
   
    return reply.status(200).send(usuario)
}  