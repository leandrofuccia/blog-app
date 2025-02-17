import { PostagemRepository } from "@/repositories/pg/postagem.repository";
import { FindPostagemBySearchUseCase } from "../find-postagem-by-search";


export function makeFindPostagemBySearchUseCase(){
    const postagemRepository = new  PostagemRepository()
    const findPostagemBySearchUseCase = new  FindPostagemBySearchUseCase(postagemRepository)
    return findPostagemBySearchUseCase
}