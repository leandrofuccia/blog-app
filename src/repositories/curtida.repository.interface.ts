import { ICurtida } from "@/entities/models/curtida.interface"

export interface ICurtidaRepository{
    create (comentario: ICurtida): Promise<ICurtida | undefined>
    delete (postid: number, usuarioid: number): Promise<void>
    curtidaCount(id: number): Promise<number>
    curtidaStatus(postagemid: number, usuarioid: number): Promise<boolean>
}
export { ICurtida }
