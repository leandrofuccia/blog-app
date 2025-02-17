import { IPerfil } from "./models/perfil.interface"

export class Perfil implements IPerfil {
    id?: number
    perfil: string
   
    constructor(perfil: string) {
      this.perfil = perfil
    }
  }