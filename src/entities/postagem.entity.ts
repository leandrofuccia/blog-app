import { IPostagem } from "./models/postagem.interface"


export class Postagem implements IPostagem {
    id?: number
    titulo: string
    conteudo: string
    usuarioid: number
    datacriacao?: Date
    dataatualizacao?: Date

    constructor(titulo: string, conteudo:string, usuarioid: number) {
      this.titulo = titulo
      this.conteudo = conteudo
      this.usuarioid = usuarioid
    }
  }
  