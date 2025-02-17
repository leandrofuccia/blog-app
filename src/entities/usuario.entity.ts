import { IUsuario } from "./models/usuario.interface"

export class Usuario implements IUsuario {
    id?: number
    nome: string
    email: string
    senha?: string
    perfilid: number
    datacriacao?: Date
    ultimologin?: Date

    constructor(nome: string, email:string, perfilid: number) {
      this.nome = nome
      this.email = email
      this.perfilid = perfilid
    }
  }
  