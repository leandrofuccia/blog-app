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

    console.log(username)
    console.log(password)
  
    const signinUseCase = makeSigninUseCase()
  
    const user = await signinUseCase.handler(username)

    console.log(user.username)
    console.log(user.password)
  
    const doestPasswordMatch = await compare(password, user.password)
  
    if (!doestPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    const findUsuarioByCredencialIdUseCase = makeFindUsuarioByCredencialUseCase()  
    const  usuario = await findUsuarioByCredencialIdUseCase.handler(user.id!)

    console.log('usuario', usuario)

    
    let token: string;

    if (!usuario || (usuario).length === 0) {
      token = await reply.jwtSign({ username})
    }else{      
      const {id } = usuario[0];
      console.log('signin.ts usuarioId', id)
      const usuarioId = id
      token = await reply.jwtSign({ username, usuarioId })
    }

    return reply.status(200).send({ token })
  }
  