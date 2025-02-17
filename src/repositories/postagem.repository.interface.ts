import { IPostagem } from "@/entities/models/postagem.interface";
import { IUsuario } from "@/entities/models/usuario.interface";

export interface IPostagemRepository{
  
    findPostagemByUsuarioId(
            usuarioId: number, 
            page: number, 
            limit: number,
         ): Promise<(IPostagem & IUsuario)[]>

    create (usuario: IPostagem): Promise<IPostagem | undefined>

    
    update (
        id: number, 
        titulo: string, 
        conteudo: string,
     ): Promise<IPostagem | undefined >

    
     delete (
        id: number, 
     ): Promise<IPostagem | undefined >


     findPostagemById(
        id: number, 
        page: number, 
        limit: number,
     ): Promise<(IPostagem)[]>


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