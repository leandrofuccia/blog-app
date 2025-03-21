import { InvalidUsuarioError } from "@/use-cases/errors/invalid-usuario-error";
import { unauthorizedPerfilError } from "@/use-cases/errors/unauthorized-perfil-error";
import { makeCreatePostagemUseCase } from "@/use-cases/factory/make-create-postagem-use-case";
import { makeFindUsuarioByCredencialUseCase } from "@/use-cases/factory/make-find-usuario-by-credencial";
import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    console.log('registrerBodySchema');
    const registrerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),  
        usuarioid: z.coerce.number(),
        
    })

    const { username, credencialId } = request.user as { username: string; credencialId: number };
    const findUsuarioByCredencialIdUseCase = makeFindUsuarioByCredencialUseCase()
    const usuario = await findUsuarioByCredencialIdUseCase.handler(credencialId)
    
    if (!usuario || (usuario).length === 0){
        throw new InvalidUsuarioError()
    } 
   
    if (usuario[0].perfilid !== 2) {
        throw new unauthorizedPerfilError()
    }
 
    const {titulo, conteudo, usuarioid} = registrerBodySchema.parse(request.body)   
    console.log('Chamando função create');        
    const createPostagemUseCase = makeCreatePostagemUseCase();
    console.log('Chamando função handler');
    const postagem = await createPostagemUseCase.handler({titulo, conteudo, usuarioid})     
    reply.code(201).send(postagem)
    
}



