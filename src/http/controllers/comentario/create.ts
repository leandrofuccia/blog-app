import { makeCreateComentarioUseCase } from "@/use-cases/factory/make-create-comentario-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registrerBodySchema = z.object({
        usuarioid: z.coerce.number().optional(),
        nome_autor: z.string(),
        conteudo: z.string(),  
    })
    
    const registreParamSchema = z.object({postid: z.coerce.number()})
    const {usuarioid, nome_autor, conteudo} = registrerBodySchema.parse(request.body)   
    const { postid } = registreParamSchema.parse(request.params)
    const createComentarioUseCase = makeCreateComentarioUseCase();
  
    const comentario = await createComentarioUseCase.handler({postid, usuarioid, nome_autor, conteudo})     
    reply.code(201).send(comentario)
    
}



