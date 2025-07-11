import { IUsuarioRepository } from "@/repositories/usuario.repository.interface";

export class deleteUsuarioUseCase {
  constructor(private usuarioRepository: IUsuarioRepository){}
            
      async handler(id: number): Promise<void> {
        
          return this.usuarioRepository.delete(id)
      }
}


