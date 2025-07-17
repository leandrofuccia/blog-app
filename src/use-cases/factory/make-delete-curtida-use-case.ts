import { CurtidaRepository } from "@/lib/typeorm/curtida.repository"
import { deleteCurtidaUseCase } from "../delete-curtida"

export function makeDeleteCurtidaUseCase(){
    const curtidaRepository = new  CurtidaRepository()
    const deleteCurtidaByUseCase = new   deleteCurtidaUseCase(curtidaRepository)
    return deleteCurtidaByUseCase
}