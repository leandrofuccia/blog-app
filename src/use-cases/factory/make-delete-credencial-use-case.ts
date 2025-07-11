import { CredencialRepository } from "@/lib/typeorm/credencial.repository"
import { deleteCredencialUseCase } from "../delete-credencial"



export function makeDeleteCredencialUseCase(){
    const credencialRepository = new  CredencialRepository()
    const deleteCredencialByUseCase = new   deleteCredencialUseCase (credencialRepository)
    return deleteCredencialByUseCase
}