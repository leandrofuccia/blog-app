import { ICredencial } from "@/entities/models/credencial.interface"
import { IUsuario } from "@/entities/models/usuario.interface"


export interface IUsuarioRepository{
    create (usuario: IUsuario): Promise<IUsuario | undefined>
    findByUsername(nome: string) : Promise<IUsuario>
    findUsuarioByCredencialId(
                usuarioId: number                 
             ): Promise<(IUsuario & ICredencial)[]>

    findByUserId(id: number) : Promise<IUsuario> 
    
    findUsuario(
          page: number, 
          limit: number,
       ): Promise<(IUsuario)[]>
}