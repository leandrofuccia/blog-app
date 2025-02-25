import { UsuarioRepository } from "@/lib/typeorm/usuario.repository"
import { FindUsuarioByCredencialUseCase } from "../find-usuario-by-credencial"


export function makeFindUsuarioByCredencialUseCase(){
    const usuarioRepository = new  UsuarioRepository()
    const findUsuarioByCredencialUseCase = new  FindUsuarioByCredencialUseCase (usuarioRepository)
    return findUsuarioByCredencialUseCase
}