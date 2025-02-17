import { PostagemRepository } from "@/repositories/pg/postagem.repository";
import { FindPostagemUseCase } from "../find-postagem";


export function makeFindPostagemUseCase(){
    const postagemRepository = new  PostagemRepository()
    const findPostagemUseCase = new  FindPostagemUseCase (postagemRepository)
    return findPostagemUseCase
}