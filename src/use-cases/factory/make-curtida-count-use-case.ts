import { CurtidaRepository } from "@/lib/typeorm/curtida.repository"
import { CurtidaCountUseCase } from "../curtidaCount"

export function makeCurtidaCountUseCase(){
    const curtidaRepository = new  CurtidaRepository()
    const curtidaCountUseCase = new  CurtidaCountUseCase(curtidaRepository)
    return curtidaCountUseCase
}