import { CredencialRepository } from "@/lib/typeorm/credencial.repository"
import { UpdateCredencialUseCase } from "../update-credencial"



export function makeUpdateCredencialUseCase(){
    const credencialRepository = new  CredencialRepository()
    const updateCredencialByUseCase = new  UpdateCredencialUseCase (credencialRepository)
    return updateCredencialByUseCase
}