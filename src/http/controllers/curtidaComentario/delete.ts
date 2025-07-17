import { makeDeleteCurtidaComentarioUseCase } from "@/use-cases/factory/make-delete-curtidacomentario-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteCurtidaComentario(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const { comentarioid } = request.params as { comentarioid: number };
    const { usuarioid } = request.query as { usuarioid: number }; 
    const deleteCurtidaComentarioUseCase = makeDeleteCurtidaComentarioUseCase()
    await deleteCurtidaComentarioUseCase.handler(comentarioid, usuarioid);
    let mensagem = "OK"
    return reply.code(200).send({ message: mensagem });
    
}