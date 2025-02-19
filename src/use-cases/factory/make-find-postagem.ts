
import { PostagemRepository } from "@/lib/typeorm/postagem.repository";
import { FindPostagemUseCase } from "../find-postagem";


export function makeFindPostagemUseCase(){
    const postagemRepository = new  PostagemRepository()
    const findPostagemUseCase = new  FindPostagemUseCase (postagemRepository)
    return findPostagemUseCase
}