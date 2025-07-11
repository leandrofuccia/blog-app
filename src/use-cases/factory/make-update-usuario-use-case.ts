import { UsuarioRepository } from "@/lib/typeorm/usuario.repository"
import { UpdateUsuarioUseCase } from "../update-usuario"

export function makeUpdateUsuarioUseCase(){
    const usuarioRepository = new  UsuarioRepository()
    const updateUsuarioByUseCase = new  UpdateUsuarioUseCase(usuarioRepository)
    return updateUsuarioByUseCase
}