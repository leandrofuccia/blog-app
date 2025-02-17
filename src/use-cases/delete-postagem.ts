import { IPostagem } from "@/entities/models/postagem.interface";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

export class deletePostagemUseCase {
  constructor(private postagemRepository: IPostagemRepository){}
   
      async handler(
          id: number,
      ): Promise<IPostagem | undefined> {
          return this.postagemRepository.delete(id)
      }
}


