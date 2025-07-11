import { IUsuarioRepository } from "@/repositories/usuario.repository.interface";



export class UpdateUsuarioUseCase {
  constructor(private usuarioRepository: IUsuarioRepository){}
   
      async handler(id: number, name: string, perfilId: number){
        return this.usuarioRepository.update (id, name, perfilId)
      }  
}


