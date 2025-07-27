import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique, Column, JoinColumn } from "typeorm";
import { Comentario } from "./comentario.entity";
import { Usuario } from "./usuario.entity";

@Entity("curtidas_comentario")
@Unique(["comentario", "usuario"])
export class CurtidaComentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'comentarioid', type: 'int' })
  comentarioid: number;
  
  @Column({ name: 'usuarioid', type: 'int'})
  usuarioid?: number;


  @ManyToOne(() => Comentario, comentario => comentario.curtidas, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'comentarioid' }) 
  comentario: Comentario;

  @ManyToOne(() => Usuario, usuario => usuario.curtidasComentario, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'usuarioid' }) 
  usuario: Usuario;

  @CreateDateColumn()
  datacriacao: Date;
}
