
import { InvalidUsuarioError } from "@/use-cases/errors/invalid-usuario-error"
import { unauthorizedPerfilError } from "@/use-cases/errors/unauthorized-perfil-error"
import { makeFindUsuarioByCredencialUseCase } from "@/use-cases/factory/make-find-usuario-by-credencial"
import { makeUpdateCredencialUseCase } from "@/use-cases/factory/make-update-credencial-use-case"
import { hash } from "bcryptjs"
import { FastifyReply, FastifyRequest } from "fastify"
import { number, z } from "zod"


export async function update(request: FastifyRequest, reply: FastifyReply) {
   
    const registreParamSchema = z.object({
        id: z.coerce.number()
    })
    
    const registrerBodySchema = z.object({
        username: z.string(),
        password: z.string(),
    })

    const { id } = registreParamSchema.parse(request.params)
    const {username, password} = registrerBodySchema.parse(request.body)
    
    const hashedPassaword = await hash(password, 8);
    const userWithHashedPassword = { username, password: hashedPassaword };
    
    const updateCredencialUseCase = makeUpdateCredencialUseCase()
    const credencial = await updateCredencialUseCase.handler(
        id,
        username,
        userWithHashedPassword.password,
        
    )    
    reply.code(200).send(credencial)
 }

