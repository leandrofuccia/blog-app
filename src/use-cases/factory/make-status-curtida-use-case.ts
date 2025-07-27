import { CurtidaRepository } from "@/lib/typeorm/curtida.repository"
import { CurtidaStatusUseCase } from "../curtidaStatus"

export function makeCurtidaStatusUseCase(){
    const curtidaRepository = new  CurtidaRepository()
    const curtidaStatusUseCase = new  CurtidaStatusUseCase(curtidaRepository)
    return curtidaStatusUseCase
}