import { ICurtidaRepository } from "@/repositories/curtida.repository.interface";

export class deleteCurtidaUseCase {
  constructor(private curtidaRepository: ICurtidaRepository){}
            
      async handler(postid: number, usuarioid: number): Promise<void> {
          return this.curtidaRepository.delete(postid, usuarioid)
      }
}


