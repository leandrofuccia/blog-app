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
 
    console.log ('Entrou em findUsuarioByCredencialId')
    const { credencialId } = registreParamSchema.parse(request.params)
   
    const findPostagemByUsuarioUseCase = makeFindUsuarioByCredencialUseCase()
    console.log ('Chamando a função handler')
    const usuario = await findPostagemByUsuarioUseCase.handler(credencialId)

    return reply.status(200).send(usuario)

}  