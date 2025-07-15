import { ComentarioRepository } from "@/lib/typeorm/comentario.repository"
import { deleteComentarioUseCase } from "../delete-comentario"

export function makeDeleteComentarioUseCase(){
    const comentarioRepository = new  ComentarioRepository()
    const deleteComentarioByUseCase = new   deleteComentarioUseCase (comentarioRepository)
    return deleteComentarioByUseCase
}