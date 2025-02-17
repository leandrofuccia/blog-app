import { makeUpdatePostagemUseCase } from "@/use-cases/factory/make-update-postagem-use-case";
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    console.log('registrerBodySchema');
    
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })
    
    const registrerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),  
    })

    const { id } = registreParamSchema.parse(request.params)

    const {titulo, conteudo, } = registrerBodySchema.parse(request.body)

    console.log('Chamando função update postagem');
        
    const updatePostagemUseCase = makeUpdatePostagemUseCase()
    
    const postagem = await updatePostagemUseCase.handler(
        id,
        titulo,
        conteudo
    )
    
    reply.code(200).send(postagem)

    //return reply.status(200).send({ id: postagem?.id, titulo: postagem?.titulo,  conteudo: postagem?.conteudo, datacriacao: postagem?.datacriacao, dataatualizacao: postagem?.dataatualizacao})

}