import { makeCreateCurtidaUseCase } from "@/use-cases/factory/make-create-curtida-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
 
  const registrerBodySchema = z.object({
    usuarioid: z.coerce.number(),
  });

  const { usuarioid } = registrerBodySchema.parse(request.body);

  const { postid } = request.params as { postid: number };

  const createCurtidaUseCase = makeCreateCurtidaUseCase();

  if (!usuarioid) {
    return reply.status(401).send({ message: "Não autenticado" });
  }

  try {
    const curtida = await createCurtidaUseCase.handler({ postid, usuarioid });
    reply.code(201).send(curtida);
  } catch (error: any) {
    console.log('createCurtidaUseCase error code ', error.code, )
    if (error.code === "23505") {
        console.log('createCurtidaUseCase entrou no error code ', error.code, )
      return reply.status(409).send({
        message: "Você já curtiu este post.",
      });
    }

    console.error(error);
    return reply.status(500).send({
      message: "Erro interno do servidor",
    });
  }
}
