export interface IComentario {
    id?: number,
    postid: number,
    usuarioid?: number,
    nome_autor: string,
    conteudo: string,
    datacriacao?: Date,
}