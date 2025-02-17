import { IPostagem } from "@/entities/models/postagem.interface";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

export class CreatePostagemCase {
  constructor(private postagemRepository: IPostagemRepository) {}

  handler (postagem: IPostagem): Promise<IPostagem | undefined> {
    return this.postagemRepository.create(postagem)
  }
}