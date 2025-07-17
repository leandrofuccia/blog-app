import { makeCreateCurtidaComentarioUseCase } from "@/use-cases/factory/make-create-curtidacomentario-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
 
  const registrerBodySchema = z.object({
    usuarioid: z.coerce.number(),
  });

  const { usuarioid } = registrerBodySchema.parse(request.body);

  const { comentarioid } = request.params as { comentarioid: number };

  const createCurtidaComentarioUseCase = makeCreateCurtidaComentarioUseCase();

  if (!usuarioid) {
    return reply.status(401).send({ message: "Não autenticado" });
  }

  try {
    const curtidaComentario = await createCurtidaComentarioUseCase.handler({ comentarioid, usuarioid });
    reply.code(201).send(curtidaComentario);
  } catch (error: any) {
    if (error.code === "P2002") {
      return reply.status(409).send({
        message: "Você já curtiu este comentario.",
      });
    }

    console.error(error);
    return reply.status(500).send({
      message: "Erro interno do servidor",
    });
  }
}
