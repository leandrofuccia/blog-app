import { CurtidaComentarioRepository } from "@/lib/typeorm/curtidacomentario.repository"
import { CurtidaComentarioStatusUseCase } from "../curtidacomentarioStatus"

export function makeCurtidaComentarioStatusUseCase(){
    const curtidaComentarioRepository = new  CurtidaComentarioRepository()
    const curtidaComentarioStatusUseCase = new  CurtidaComentarioStatusUseCase(curtidaComentarioRepository)
    return curtidaComentarioStatusUseCase
}