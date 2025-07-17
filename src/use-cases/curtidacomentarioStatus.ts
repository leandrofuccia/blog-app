import { ICurtidaComentarioRepository } from "@/repositories/curtidaComentario.repository.interface"

export class CurtidaComentarioStatusUseCase{
    constructor(private curtidaComentarioRepository: ICurtidaComentarioRepository){}

    async handler (comentarioid: number, usruarioid: number){
        const status = await this.curtidaComentarioRepository.curtidaComentarioStatus(comentarioid, usruarioid)
        return status    
    }
}