
import { ICredencial } from "@/entities/models/credencial.interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IUsuarioRepository } from "@/repositories/usuario.repository.interface";
import { IUsuario } from "@/entities/models/usuario.interface";

export class FindUsuarioByCredencialUseCase{
    constructor(private usuarioRepository: IUsuarioRepository){}

    async handler(
        credencialId: number
    ): Promise<(IUsuario & ICredencial)[]> {
        const usuario =  await this.usuarioRepository.findUsuarioByCredencialId(credencialId)
        return usuario;
    }
}