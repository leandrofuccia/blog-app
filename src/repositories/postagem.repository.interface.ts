import { IPostagem } from "@/entities/models/postagem.interface";
import { IUsuario } from "@/entities/models/usuario.interface";

export interface IPostagemRepository{
  
    findPostagemByUsuarioId(
            usuarioId: number, 
            page: number, 
            limit: number,
         ): Promise<(IPostagem & IUsuario)[]>

    create (postagem: IPostagem): Promise<IPostagem | undefined>

    
    update (id: number, titulo: string, conteudo: string): Promise<IPostagem | undefined >

    
     delete (id: number): Promise<void>


     findPostagemById(
        id: number, 
        /*page: number, 
        limit: number,*/
     ): Promise<IPostagem | undefined >


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