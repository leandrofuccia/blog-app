import { IComentario, IComentarioRepository } from "@/repositories/comentario.repository.interface";

export class CreateComentarioCase {
  constructor(private comentarioRepository: IComentarioRepository) {}

  async handler (comentario: IComentario): Promise<IComentario | undefined> {
    return this.comentarioRepository.create(comentario)
  }
}