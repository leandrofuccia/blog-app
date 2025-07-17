import { makeDeleteCurtidaUseCase } from "@/use-cases/factory/make-delete-curtida-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteCurtida(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const { postid } = request.params as { postid: number };
    const { usuarioid } = request.query as { usuarioid: number }; 
    const deleteCurtidaUseCase = makeDeleteCurtidaUseCase()
    await deleteCurtidaUseCase.handler(postid, usuarioid);
    let mensagem = "OK"
    return reply.code(200).send({ message: mensagem });
    
}