import { UsuarioRepository } from "@/lib/typeorm/usuario.repository"
import { FindUsuarioUseCase } from "../find-usuario"

export function makeFindUsuarioUseCase(){
    const usuarioRepository = new  UsuarioRepository()
    const findUsuarioUseCase = new  FindUsuarioUseCase (usuarioRepository)
    return findUsuarioUseCase
}