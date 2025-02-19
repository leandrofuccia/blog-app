import { IPostagem } from "@/entities/models/postagem.interface";
import { IUsuario } from "@/entities/models/usuario.interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

export class FindPostagemByUsuarioUseCase{
    constructor(private postagemRepository: IPostagemRepository){}

    async handler(
        usuarioId: number,
        page: number,
        limit: number,
    ): Promise<(IPostagem & IUsuario)[]> {
        const postagem =  await this.postagemRepository.findPostagemByUsuarioId(usuarioId, page, limit)
        if (!postagem || (postagem).length === 0) {
                throw new ResourceNotFoundError();
              }
          
        return postagem;
    }
}