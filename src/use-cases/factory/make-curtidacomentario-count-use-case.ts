import { CurtidaComentarioRepository } from "@/lib/typeorm/curtidacomentario.repository"
import { CurtidaComentarioCountUseCase } from "../curtidacomentarioCount"

export function makeCurtidaComentarioCountUseCase(){
    const curtidaComentarioRepository = new  CurtidaComentarioRepository()
    const curtidaComentarioCountUseCase = new  CurtidaComentarioCountUseCase(curtidaComentarioRepository)
    return curtidaComentarioCountUseCase
}