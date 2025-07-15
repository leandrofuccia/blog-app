import { IPostagem } from "./models/postagem.interface";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Comentario } from "./comentario.entity";

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
    type: 'int',
  })
  usuarioid: number;

  @Column({ 
    name: 'datacriacao',
    type: process.env.NODE_ENV === "test" ? "text" : "timestamp", 
    default: () => process.env.NODE_ENV === "test" ? "CURRENT_TIMESTAMP" : "'now()'"
  })
  datacriacao: Date;


  @Column({
    name: 'dataatualizacao',
    type: process.env.NODE_ENV === "test" ? "text" : "timestamp",
    default: () => process.env.NODE_ENV === "test" ? "CURRENT_TIMESTAMP" : "'now()'"
  })
  dataatualizacao?: Date;

  @ManyToOne(() => Usuario, usuario => usuario.postagens, { nullable: false })
  @JoinColumn({ name: 'usuarioid' })
  
  usuario: Usuario;  

  @OneToMany(() => Comentario, comentario => comentario.postagem)
  comentarios?: Comentario[];


  postagem?: IPostagem[] | undefined;
  
  constructor(titulo: string, conteudo: string, usuarioid: number) {
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.usuarioid = usuarioid;
  }
}
