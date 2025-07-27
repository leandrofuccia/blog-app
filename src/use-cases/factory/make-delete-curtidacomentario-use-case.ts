import { CurtidaComentarioRepository } from "@/lib/typeorm/curtidacomentario.repository"
import { deleteCurtidaComentarioUseCase } from "../delete-curtidacomentario"

export function makeDeleteCurtidaComentarioUseCase(){
    const curtidaComentarioRepository = new  CurtidaComentarioRepository()
    const deleteCurtidaComentarioByUseCase = new   deleteCurtidaComentarioUseCase(curtidaComentarioRepository)
    return deleteCurtidaComentarioByUseCase
}