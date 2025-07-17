import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ICurtida } from "./models/curtida.interface";
import { Postagem } from "./postagem.entity";
import { Usuario } from "./usuario.entity";


@Entity('curtida')
@Unique(['postagem', 'usuario']) // garante que um usuário só pode curtir 1x
export class Curtida {
  @PrimaryGeneratedColumn()
  id: number;

@Column({ name: 'postid', type: 'int' })
  postid: number;

  @Column({ name: 'usuarioid', type: 'int'})
  usuarioid?: number;

  @ManyToOne(() => Postagem, (postagem) => postagem.curtidas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postid' })
  postagem: Postagem;

  @ManyToOne(() => Usuario, (usuario) => usuario.curtidas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuarioid' })
  usuario: Usuario;

  @CreateDateColumn({ name: 'datacriacao' })
  datacriacao: Date;
}