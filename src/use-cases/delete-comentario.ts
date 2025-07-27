import { IComentarioRepository } from "@/repositories/comentario.repository.interface";


export class deleteComentarioUseCase {
  constructor(private comentarioRepository: IComentarioRepository){}
            
      async handler(id: number): Promise<void> {
        
          return this.comentarioRepository.delete(id)
      }
}


