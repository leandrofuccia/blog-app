import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeSigninUseCase } from '@/use-cases/factory/make-signin-use-case';
import { compare } from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  try {
    //Validação mais precisa usando Zod
    const registerBodySchema = z.object({
      username: z.string().email("O e-mail inserido é inválido"),
      password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres"),
    });

    console.log("Recebendo dados do request:", request.body);

    // Validação do corpo da requisição
    const { username, password } = registerBodySchema.parse(request.body);

    const signinUseCase = makeSigninUseCase();
    const user = await signinUseCase.handler(username);

    console.log("user não existente ", user)

    if (!user) {
      const error = new InvalidCredentialsError();
      return reply.status(404).send({ message: error.message });
    }


    console.log("Usuário encontrado:", user);

    const doestPasswordMatch = await compare(password, user.password)
   
    if (!doestPasswordMatch) {
      const error = new InvalidCredentialsError();
      return reply.status(401).send({ message: error.message });
    }

    //Geração de token JWT
    const token = await reply.jwtSign({ username, credencialId: user.id });

    console.log("Login bem-sucedido para:", username);
    return reply.status(200).send({ token });

  } catch (error) {
    console.error("Erro interno no servidor:", error);

    //Tratamento para erros de validação do Fastify/Zod
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: error.errors.map(e => e.message).join(", ") });
    }

    return reply.status(500).send({ message: "Erro interno no servidor." });
  }
}