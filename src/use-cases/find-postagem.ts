import { IPostagem } from "@/entities/models/postagem.interface";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

export class FindPostagemUseCase{
    constructor(private postagemRepository: IPostagemRepository){}

    async handler(
        page: number,
        limit: number,
    ): Promise<(IPostagem)[]> {
        return this.postagemRepository.findPostagem(page, limit)
    }
}