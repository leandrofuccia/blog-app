
import { PostagemRepository } from "@/lib/typeorm/postagem.repository";
import { FindPostagemByIdUseCase } from "../find-postagem-by-Id";


export function makeFindPostagemByIdUseCase(){
    const postagemRepository = new  PostagemRepository()
    const findPostagemByIdUseCase = new  FindPostagemByIdUseCase (postagemRepository)
    return findPostagemByIdUseCase
}