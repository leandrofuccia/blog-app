import { IPostagemRepository } from "@/repositories/postagem.repository.interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


export class FindPostagemByIdUseCase{
    constructor(private postagemRepository: IPostagemRepository){}

    async handler (id: number){
        const postagem = await this.postagemRepository.findPostagemById(id)

        if (!postagem) throw new ResourceNotFoundError()

        return postagem    
    }
}