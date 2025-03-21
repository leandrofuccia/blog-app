import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeFindUsuarioByCredencialUseCase } from '@/use-cases/factory/make-find-usuario-by-credencial'
import { makeSigninUseCase } from '@/use-cases/factory/make-signin-use-case'
import { compare } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function signin(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      username: z.string(),
      password: z.string(),
    })

    const { username, password } = registerBodySchema.parse(request.body)
    const signinUseCase = makeSigninUseCase()
    const user = await signinUseCase.handler(username)
    const credencialId = user?.id
    const doestPasswordMatch = await compare(password, user.password)
  
    if (!doestPasswordMatch) {
      throw new InvalidCredentialsError()
    }
      
    let token: string;
    token = await reply.jwtSign({ username, credencialId })
    return reply.status(200).send({ token })
  }
  