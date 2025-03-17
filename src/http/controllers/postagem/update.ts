import { unauthorizedPerfilError } from "@/use-cases/errors/unauthorized-perfil-error";
import { makeFindUsuarioByIdUseCase } from "@/use-cases/factory/make-find-usuario-by-Id";
import { makeUpdatePostagemUseCase } from "@/use-cases/factory/make-update-postagem-use-case";
import { FastifyReply, FastifyRequest } from "fastify"
import { number, z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    console.log('registrerBodySchema');
    
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })
    
    const registrerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),  
        usuarioid: z.coerce.number(),
    })

    const { id } = registreParamSchema.parse(request.params)

    const {titulo, conteudo, usuarioid} = registrerBodySchema.parse(request.body)

    const findByUserIdUseCase = makeFindUsuarioByIdUseCase()  
    const usuario = await findByUserIdUseCase.handler(usuarioid)
    console.log("Perfil ",  usuario.perfilid)    
    if (usuario.perfilid !== 2) {
        throw new unauthorizedPerfilError()
    }

    console.log('Chamando função update postagem');
        
    const updatePostagemUseCase = makeUpdatePostagemUseCase()
    
    const postagem = await updatePostagemUseCase.handler(
        id,
        titulo,
        conteudo
    )
    
    reply.code(200).send(postagem)
    

}
