import { ICurtidaComentario, ICurtidaComentarioRepository } from "@/repositories/curtidaComentario.repository.interface";

export class CreateCurtidaComentarioCase {
  constructor(private curtidaComentarioRepository: ICurtidaComentarioRepository) {}

  async handler (curtidaComentario: ICurtidaComentario): Promise<ICurtidaComentario | undefined> {
    return this.curtidaComentarioRepository.create(curtidaComentario)
  }
}