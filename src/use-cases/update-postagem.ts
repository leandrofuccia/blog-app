import { IPostagem } from "@/entities/models/postagem.interface";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

export class UpdatePostagemUseCase {
  constructor(private postagemRepository: IPostagemRepository){}
   
      async handler(
          id: number,
          titulo: string,
          conteudo: string,
      ): Promise<IPostagem | undefined> {
          return this.postagemRepository.update(id, titulo, conteudo)
      }
}


