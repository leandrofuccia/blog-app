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

         
    reply.code(201).send(postagem)
    
}



