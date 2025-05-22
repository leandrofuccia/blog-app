/*import { makeCreateCredencialUseCase } from "@/use-cases/factory/make-create-credencial-use-case";
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
*/

import { makeCreateCredencialUseCase } from "@/use-cases/factory/make-create-credencial-use-case";
import { hash } from "bcryptjs";

import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"


export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { username, password } = registerBodySchema.parse(request.body);

  const hashedPassaword = await hash(password, 8);
  const userWithHashedPassword = { username, password: hashedPassaword };

  const createCredencialUseCase = makeCreateCredencialUseCase();

  try {
    const credencial = await createCredencialUseCase.handler(userWithHashedPassword);
    return reply.status(201).send({
      id: credencial?.id?.toString(),
      username: credencial?.username,
    });
  } catch (error: any) {
    if (error.name === "DuplicateUsernameError") {
      return reply.status(409).send({
        message: "Email já cadastrado.",
        code: "DUPLICATE_USERNAME",
      });
    }

    console.error(error);
    return reply.status(500).send({
      message: "Erro interno do servidor",
    });
  }
}
