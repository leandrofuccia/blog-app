import { makeCurtidaStatusUseCase } from "@/use-cases/factory/make-status-curtida-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function curtidaStatus(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const { postid } = request.params as { postid: number };
    const { usuarioid } = request.query as { usuarioid: number };    
    const curtidaSatusUseCase = makeCurtidaStatusUseCase()
    const status = await curtidaSatusUseCase.handler(postid, usuarioid)
    console.log('já curtir? ', status)    
    return reply.status(200).send({ curtiu: status });
    
}