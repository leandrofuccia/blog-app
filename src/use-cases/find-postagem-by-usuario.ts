import { IPostagem } from "@/entities/models/postagem.interface";
import { IUsuario } from "@/entities/models/usuario.interface";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

export class FindPostagemByUsuarioUseCase{
    constructor(private postagemRepository: IPostagemRepository){}

    async handler(
        usuarioId: number,
        page: number,
        limit: number,
    ): Promise<(IPostagem & IUsuario)[]> {
        return this.postagemRepository.findPostagemByUsuarioId(usuarioId, page, limit)
    }
}