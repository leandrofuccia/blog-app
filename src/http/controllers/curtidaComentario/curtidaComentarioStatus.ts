import { makeCurtidaComentarioStatusUseCase } from "@/use-cases/factory/make-status-curtidacomentario-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function curtidaComentarioStatus(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const { comentarioid } = request.params as { comentarioid: number };
    const { usuarioid } = request.query as { usuarioid: number };    
    const curtidaComentarioSatusUseCase = makeCurtidaComentarioStatusUseCase()
    const status = await curtidaComentarioSatusUseCase.handler(comentarioid, usuarioid)
    console.log('já curtir? ', status)    
    return reply.status(200).send({ curtiu: status });
    
}