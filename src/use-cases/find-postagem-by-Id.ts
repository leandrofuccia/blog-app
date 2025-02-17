import { IPostagem } from "@/entities/models/postagem.interface";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

export class FindPostagemByIdUseCase{
    constructor(private postagemRepository: IPostagemRepository){}

    async handler(
        id: number,
        page: number,
        limit: number,
    ): Promise<(IPostagem)[]> {
        return this.postagemRepository.findPostagemById(id, page, limit)
    }
}