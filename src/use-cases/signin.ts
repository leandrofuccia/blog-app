
import { ICredencialRepository } from "@/repositories/credencial.repository.interface";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

export class SigninUseCase{
    constructor(private readonly credencialRepository : ICredencialRepository){}

    async handler(username: string){
        const user = await this.credencialRepository.findByUsername(username)
        return user
    }
}