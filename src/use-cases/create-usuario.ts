import { IUsuario } from '@/entities/models/usuario.interface'
import { IUsuarioRepository } from '@/repositories/usuario.repository.interface'



export class CreateUsuarioUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}


  handler (usuario: IUsuario): Promise<IUsuario | undefined> {
    return this.usuarioRepository.create(usuario)
  }
}
