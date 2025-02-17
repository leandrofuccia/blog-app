import { IUsuario } from '@/entities/models/usuario.interface'

export interface IUsuarioRepository{
    create (usuario: IUsuario): Promise<IUsuario | undefined>
}