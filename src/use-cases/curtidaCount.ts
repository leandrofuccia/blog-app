import { ICurtidaRepository } from "@/repositories/curtida.repository.interface"

export class CurtidaCountUseCase{
    constructor(private curtidaRepository: ICurtidaRepository){}

    async handler (id: number){
        const count = await this.curtidaRepository.curtidaCount(id)
        return count    
    }
}