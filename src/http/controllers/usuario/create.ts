import { makeCreateUsuarioUseCase } from "@/use-cases/factory/make-create-usuario-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registrerBodySchema = z.object({
        nome: z.string(),
        perfilid: z.coerce.number(),
        credencialId: z.coerce.number(),
    })

    const  {nome, perfilid, credencialId} = registrerBodySchema.parse(request.body)  
    const user = {nome,  perfilid, credencialId} 
    const createUsuarioUseCase = makeCreateUsuarioUseCase();
    const usuario = await createUsuarioUseCase.handler(user)
    return reply.status(201).send({id: usuario?.id, nome: usuario?.nome, perfilid: usuario?.perfilid, credencialId: usuario?.credencialId})
}



