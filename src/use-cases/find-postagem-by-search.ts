import { IPostagem } from "@/entities/models/postagem.interface";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

export class FindPostagemBySearchUseCase{
    constructor(private postagemRepository: IPostagemRepository){}

    async handler(
      palavrasChave: string, 
      page: number, 
      limit: number,
    ): Promise<(IPostagem)[]> {
        return this.postagemRepository.findPostagemBySearch(palavrasChave, page, limit)
    }
}


