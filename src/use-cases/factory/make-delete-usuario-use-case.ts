import { UsuarioRepository } from "@/lib/typeorm/usuario.repository"
import { deleteUsuarioUseCase } from "../delete-usuario"



export function makeDeleteUsuarioUseCase(){
    const usuarioRepository = new  UsuarioRepository()
    const deleteUsuarioByUseCase = new   deleteUsuarioUseCase (usuarioRepository)
    return deleteUsuarioByUseCase
}