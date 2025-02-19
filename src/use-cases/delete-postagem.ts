import { IPostagemRepository } from "@/repositories/postagem.repository.interface";


export class deletePostagemUseCase {
  constructor(private postagemRepository: IPostagemRepository){}
   
      async handler(id: number): Promise<void> {
          return this.postagemRepository.delete(id)
      }
}


