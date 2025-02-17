import { Usuario } from '@/entities/usuario.entity'
import { IUsuarioRepository } from '@/repositories/usuario.repository.interface'



export class CreateUsuarioUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}


  handler (usuario: Usuario): Promise<Usuario | undefined> {
    return this.usuarioRepository.create(usuario)
  }
}
