import { InvalidUsuarioError } from "@/use-cases/errors/invalid-usuario-error";
import { unauthorizedPerfilError } from "@/use-cases/errors/unauthorized-perfil-error";
import { makeFindUsuarioByCredencialUseCase } from "@/use-cases/factory/make-find-usuario-by-credencial";
import { makeUpdatePostagemUseCase } from "@/use-cases/factory/make-update-postagem-use-case";
import { FastifyReply, FastifyRequest } from "fastify"
import { number, z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
   
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })
    
    const registrerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),     
    })

    const { id } = registreParamSchema.parse(request.params)
    const {titulo, conteudo} = registrerBodySchema.parse(request.body)
    const { username, credencialId } = request.user as { username: string; credencialId: number };
    const findUsuarioByCredencialIdUseCase = makeFindUsuarioByCredencialUseCase()
    const usuario = await findUsuarioByCredencialIdUseCase.handler(credencialId)
        
    if (!usuario || (usuario).length === 0){
        throw new InvalidUsuarioError()
    } 
        
    if (usuario[0].perfilid !== 2) {
        throw new unauthorizedPerfilError()
    }

    const updatePostagemUseCase = makeUpdatePostagemUseCase()
    const postagem = await updatePostagemUseCase.handler(
        id,
        titulo,
        conteudo
    )    
    reply.code(200).send(postagem)
 }
