import { ICurtidaComentarioRepository } from "@/repositories/curtidaComentario.repository.interface";

export class deleteCurtidaComentarioUseCase {
  constructor(private curtidaComentarioRepository: ICurtidaComentarioRepository){}
            
      async handler(comentarioid: number, usuarioid: number): Promise<void> {
          return this.curtidaComentarioRepository.delete(comentarioid, usuarioid)
      }
}


