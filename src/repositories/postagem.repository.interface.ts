import { IPostagem } from "@/entities/models/postagem.interface";
import { IUsuario } from "@/entities/models/usuario.interface";

export interface IPostagemRepository{
  
    findPostagemByUsuarioId(
            usuarioId: number, 
            page: number, 
            limit: number,
         ): Promise<(IPostagem & IUsuario)[]>

    create (postagem: IPostagem): Promise<IPostagem>

    
    update (id: number, titulo: string, conteudo: string): Promise<IPostagem >

    
     delete (id: number): Promise<void>


     findPostagemById(
        id: number, 
     ): Promise<IPostagem>


     findPostagemBySearch(
      palavrasChave: string, 
      page: number, 
      limit: number,
   ): Promise<(IPostagem)[]>

   
   findPostagem(
      page: number, 
      limit: number,
   ): Promise<(IPostagem)[]>
   

    
}