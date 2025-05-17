import { IUsuario } from "@/entities/models/usuario.interface";
import { IUsuarioRepository } from "@/repositories/usuario.repository.interface";


export class FindUsuarioUseCase{
    constructor(private usuarioRepository: IUsuarioRepository){}
    

    async handler(
        page: number,
        limit: number,
    ): Promise<(IUsuario)[]> {
        return this.usuarioRepository.findUsuario(page, limit)
    }
}