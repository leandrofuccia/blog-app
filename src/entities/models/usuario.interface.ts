import { IPostagem } from "./postagem.interface"

export interface IUsuario {
    id?: number
    nome: string
    perfilid: number
    datacriacao?: Date
    ultimologin?: Date
    credencialId?: number 
    postagem?: IPostagem  
     
}