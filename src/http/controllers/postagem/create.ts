import { makeCreatePostagemUseCase } from "@/use-cases/factory/make-create-postagem-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    console.log('registrerBodySchema');
    const registrerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),  
        usuarioid: z.coerce.number(),
        
    })

    const {titulo, conteudo, usuarioid} = registrerBodySchema.parse(request.body)
    console.log('Chamando função create');
        
    const createPostagemUseCase = makeCreatePostagemUseCase();
    console.log('Chamando função handler');
    const postagem = await createPostagemUseCase.handler({titulo, conteudo, usuarioid})

        //return reply.send({ message: 'Usuário criado com sucesso!' });
    //return reply.status(201).send({ id: usuario?.id, nome: usuario?.nome,  email: usuario?.email, senha: usuario?.senha, perfilid: usuario?.perfilid})
    
    reply.code(201).send(postagem)
    
}



