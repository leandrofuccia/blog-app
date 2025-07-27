import { IPostagem } from "@/entities/models/postagem.interface";
import { IComentario, IComentarioRepository } from "@/repositories/comentario.repository.interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class FindComentarioByPostagemUseCase{
    constructor(private comentarioRepository: IComentarioRepository){}

    async handler(
        postagemId: number,
        page: number,
        limit: number,
    ): Promise<(IComentario & IPostagem)[]> {
        const comentario =  await this.comentarioRepository.findComentarioByPostagemId(postagemId, page, limit)
        return comentario;
    }
}