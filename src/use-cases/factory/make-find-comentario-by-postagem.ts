import { ComentarioRepository } from "@/lib/typeorm/comentario.repository"
import { FindComentarioByPostagemUseCase } from "../find-comentario-by-postagem"

export function makeFindComentarioByPostagemUseCase(){
    const comentarioRepository = new  ComentarioRepository()
    const findComentarioByPostagemoUseCase = new  FindComentarioByPostagemUseCase (comentarioRepository)
    return findComentarioByPostagemoUseCase
}