
import { PostagemRepository } from "@/lib/typeorm/postagem.repository";
import { FindPostagemByUsuarioUseCase } from "../find-postagem-by-usuario";


export function makeFindPostagemByUsuarioUseCase(){
    const postagemRepository = new  PostagemRepository()
    const findPostagemByUsuarioUseCase = new  FindPostagemByUsuarioUseCase (postagemRepository)
    return findPostagemByUsuarioUseCase
}