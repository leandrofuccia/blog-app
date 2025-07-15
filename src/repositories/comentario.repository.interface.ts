import { IComentario } from "@/entities/models/comentario.interface"
import { IPostagem } from "@/entities/models/postagem.interface"

export interface IComentarioRepository{
    create (comentario: IComentario): Promise<IComentario | undefined>
    findComentarioByPostagemId(postagemId: number, page: number, limit: number): Promise<(IComentario & IPostagem)[]> 
    delete (id: number): Promise<void>
    comentarioCount(id: number): Promise<number>
    
}
export { IComentario }
