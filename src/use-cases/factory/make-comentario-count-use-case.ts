import { ComentarioRepository } from "@/lib/typeorm/comentario.repository"
import { ComentarioCountUseCase } from "../comentarioCount"

export function makeComentarioCountUseCase(){
    const comentarioRepository = new  ComentarioRepository()
    const comentarioCountUseCase = new  ComentarioCountUseCase (comentarioRepository)
    return comentarioCountUseCase
}