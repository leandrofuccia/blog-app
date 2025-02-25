/*import { IPostagem } from "./models/postagem.interface"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Usuario } from "./usuario.entity"
import { IUsuario } from "./models/usuario.interface"

@Entity({
  name: 'postagem',
})

export class Postagem implements IPostagem {
    @PrimaryGeneratedColumn('increment',{
    name: 'id',
    })
    id?: number | undefined

    @Column({
      name: 'titulo',
      type: 'varchar'
    })
    titulo: string

    @Column({
      name: 'conteudo',
      type: 'varchar'
    })
    conteudo: string

    @Column({
      name: 'usuarioid',
      type: 'int4'
    })
    usuarioid: number

    @Column({
      name: 'datacriacao',
      type: 'timestamp without time zone',
      default: () => 'CURRENT TIMESTAMP'
    })
    datacriacao?: Date

    @Column({
      name: 'dataatualizacao',
      type: 'timestamp without time zone',
      default: () => 'CURRENT TIMESTAMP'
    })
    dataatualizacao?: Date

    @ManyToOne(() => Usuario, {
      cascade: true, 
    })
    
    postagem?: IUsuario[] | undefined


    constructor(titulo: string, conteudo:string, usuarioid: number) {
      this.titulo = titulo
      this.conteudo = conteudo
      this.usuarioid = usuarioid
    }
  }
  */

import { IPostagem } from "./models/postagem.interface";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { IUsuario } from "./models/usuario.interface";

@Entity({
  name: 'postagem',
})
export class Postagem implements IPostagem {
  [x: string]: any;
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id?: number | undefined;

  @Column({
    name: 'titulo',
    type: 'varchar',
  })
  titulo: string;

  @Column({
    name: 'conteudo',
    type: 'varchar',
  })
  conteudo: string;
 
  @Column({
    name: 'usuarioid',
    type: 'int4',
  })
  usuarioid: number;

  @Column({
    name: 'datacriacao',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  datacriacao?: Date;

  @Column({
    name: 'dataatualizacao',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataatualizacao?: Date;

 /* @ManyToOne(() => Usuario, {
    cascade: true,
  })*/

  /*@ManyToOne(() => Usuario, usuario => usuario.postagens)*/
  @ManyToOne(() => Usuario, usuario => usuario.postagens, { nullable: false })
  @JoinColumn({ name: 'usuarioid' })  // Usar @JoinColumn para especificar a coluna de junção
  
  usuario: Usuario;  

  
  postagem?: IPostagem[] | undefined;

  constructor(titulo: string, conteudo: string, usuarioid: number) {
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.usuarioid = usuarioid;
  }
}
