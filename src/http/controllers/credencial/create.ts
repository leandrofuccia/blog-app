import { makeCreateCredencialUseCase } from "@/use-cases/factory/make-create-credencial-use-case";
import { hash } from "bcryptjs";

import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        username: z.string(),
        password: z.string(),
    })
    const {username, password} = registerBodySchema.parse(request.body)  
    const hashedPassaword = await hash(password, 8)
    const userWithHashedPassword = {username, password: hashedPassaword}        
    const createCredencialUseCase = makeCreateCredencialUseCase();
    const credencial = await createCredencialUseCase.handler(userWithHashedPassword)
    return reply.status(201).send({id: credencial?.id, username: credencial?.username})
}



