import { ICurtida, ICurtidaRepository } from "@/repositories/curtida.repository.interface";

export class CreateCurtidaCase {
  constructor(private curtidaRepository: ICurtidaRepository) {}

  async handler (curtida: ICurtida): Promise<ICurtida | undefined> {
    return this.curtidaRepository.create(curtida)
  }
}