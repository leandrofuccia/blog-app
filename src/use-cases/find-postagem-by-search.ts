import { IPostagem } from "@/entities/models/postagem.interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

export class FindPostagemBySearchUseCase{
    constructor(private postagemRepository: IPostagemRepository){}

    async handler(
      palavrasChave: string,
      page: number,
      limit: number,
    ): Promise<IPostagem[]> {
      
      const postagem = await this.postagemRepository.findPostagemBySearch(palavrasChave, page, limit);
  
      if (!postagem || postagem.length === 0) {
        throw new ResourceNotFoundError();
      }
  
      return postagem;
    }
}


