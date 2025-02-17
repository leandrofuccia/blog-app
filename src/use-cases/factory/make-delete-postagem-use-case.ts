import { PostagemRepository } from "@/repositories/pg/postagem.repository"
import { deletePostagemUseCase } from "../delete-postagem"

export function makeDeletePostagemUseCase(){
    const postagemRepository = new  PostagemRepository()
    const deletePostagemByUseCase = new   deletePostagemUseCase (postagemRepository)
    return deletePostagemByUseCase
}