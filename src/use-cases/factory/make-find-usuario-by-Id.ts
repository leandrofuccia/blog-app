import { UsuarioRepository } from "@/lib/typeorm/usuario.repository"
import { FindUsuarioByIdUseCase } from "../find-usuario-by-Id"


export function makeFindUsuarioByIdUseCase(){
    const usuarioRepository = new  UsuarioRepository()
    const findUsuarioIdUseCase = new  FindUsuarioByIdUseCase(usuarioRepository)
    return findUsuarioIdUseCase
}