
import { PostagemRepository } from "@/lib/typeorm/postagem.repository"
import { UpdatePostagemUseCase } from "../update-postagem"

export function makeUpdatePostagemUseCase(){
    const postagemRepository = new  PostagemRepository()
    const updatePostagemByUseCase = new  UpdatePostagemUseCase (postagemRepository)
    return updatePostagemByUseCase
}