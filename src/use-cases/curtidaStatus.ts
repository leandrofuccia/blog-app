import { ICurtidaRepository } from "@/repositories/curtida.repository.interface"

export class CurtidaStatusUseCase{
    constructor(private curtidaRepository: ICurtidaRepository){}

    async handler (postagemid: number, usruarioid: number){
        const status = await this.curtidaRepository.curtidaStatus(postagemid, usruarioid)
        return status    
    }
}