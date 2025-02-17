import { makeCreateUsuarioUseCase } from "@/use-cases/factory/make-create-usuario-use-case"

import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    console.log('registrerBodySchema');
    const registrerBodySchema = z.object({
        nome: z.string(),
        email: z.string(),  
        senha: z.string(),
        perfilid: z.coerce.number(),
    })

    const {nome, email, senha, perfilid} = registrerBodySchema.parse(request.body)   
  
    console.log('Chamando função create');
        
    const createUsuarioUseCase = makeCreateUsuarioUseCase();
    console.log('Chamando função handler');
    const usuario = await createUsuarioUseCase.handler({nome, email, senha, perfilid})

    //return reply.send({ message: 'Usuário criado com sucesso!' });
    return reply.status(201).send({ id: usuario?.id, nome: usuario?.nome,  email: usuario?.email, senha: usuario?.senha, perfilid: usuario?.perfilid})
}



