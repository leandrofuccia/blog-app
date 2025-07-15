import { IComentarioRepository } from "@/repositories/comentario.repository.interface"


export class ComentarioCountUseCase{
    constructor(private comentarioRepository: IComentarioRepository){}

    async handler (id: number){
        const count = await this.comentarioRepository.comentarioCount(id)
        return count    
    }
}