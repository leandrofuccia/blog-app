import { IPostagem } from "./postagem.interface"

export interface IUsuario {
    id?: number
    nome: string
    email: string
    senha?: string
    perfilid: number
    datacriacao?: Date
    ultimologin?: Date
    postagem?: IPostagem    
}