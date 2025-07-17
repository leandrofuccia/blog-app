import { ICurtidaComentario } from "@/entities/models/curtidaComentario.interface"

export interface ICurtidaComentarioRepository{
    create (cortidacomentario: ICurtidaComentario): Promise<ICurtidaComentario | undefined>
    delete (comentarioid: number, usuarioid: number): Promise<void>
    curtidaComentarioCount(comentarioid: number): Promise<number>
    curtidaComentarioStatus(comentarioid: number, usuarioid: number): Promise<boolean>
}
export { ICurtidaComentario }
