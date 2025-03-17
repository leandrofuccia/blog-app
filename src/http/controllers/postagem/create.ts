import { unauthorizedPerfilError } from "@/use-cases/errors/unauthorized-perfil-error";
import { makeCreatePostagemUseCase } from "@/use-cases/factory/make-create-postagem-use-case";
import { makeFindUsuarioByIdUseCase } from "@/use-cases/factory/make-find-usuario-by-Id";
import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    console.log('registrerBodySchema');
    const registrerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),  
        usuarioid: z.coerce.number(),
        
    })

    const { username, usuarioId } = request.user as { username: string; usuarioId: number };

    const findByUserIdUseCase = makeFindUsuarioByIdUseCase()  
    const usuario = await findByUserIdUseCase.handler(usuarioId)
    
    console.log("Perfil ",  usuario.perfilid)    
    if (usuario.perfilid !== 2) {
        throw new unauthorizedPerfilError()
    }


    const {titulo, conteudo, usuarioid} = registrerBodySchema.parse(request.body)
    
    
  
    console.log('Chamando função create');
        
    const createPostagemUseCase = makeCreatePostagemUseCase();
    console.log('Chamando função handler');
    const postagem = await createPostagemUseCase.handler({titulo, conteudo, usuarioid})

         
    reply.code(201).send(postagem)
    
}



