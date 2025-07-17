import { ICurtidaComentarioRepository } from "@/repositories/curtidaComentario.repository.interface"

export class CurtidaComentarioCountUseCase{
    constructor(private curtidaComentarioRepository: ICurtidaComentarioRepository){}

    async handler (comentarioid: number){
        const count = await this.curtidaComentarioRepository.curtidaComentarioCount(comentarioid)
        return count    
    }
}