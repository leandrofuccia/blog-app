import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IComentario } from './models/comentario.interface';
import { Postagem } from './postagem.entity';
import { Usuario } from './usuario.entity';
import { CurtidaComentario } from './curtidaComentario.entity';

@Entity({ name: 'comentario' })
export class Comentario implements IComentario {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id?: number;

  @Column({ name: 'postid', type: 'int' })
  postid: number;

  @Column({ name: 'usuarioid', type: 'int', nullable: true })
  usuarioid?: number;

  @Column({ name: 'nome_autor', type: 'varchar' })
  nome_autor: string;

  @Column({ name: 'conteudo', type: 'varchar' })
  conteudo: string;

  @Column({
    name: 'datacriacao',
    type: process.env.NODE_ENV === 'test' ? 'text' : 'timestamp',
    default: () =>
      process.env.NODE_ENV === 'test' ? 'CURRENT_TIMESTAMP' : "'now()'",
  })
  datacriacao: Date;

  // Relacionamento: muitos comentários para uma postagem
  @ManyToOne(() => Postagem, postagem => postagem.comentarios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postid' })
  postagem: Postagem;

  // Relacionamento: muitos comentários para um usuário (opcional)
  @ManyToOne(() => Usuario, usuario => usuario.comentario, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuarioid' })
  usuario?: Usuario;

  @OneToMany(() => CurtidaComentario, curtida => curtida.comentario)
  curtidas: CurtidaComentario[];


  constructor(postid: number, usuarioid: number | undefined, nome_autor: string, conteudo: string) {
    this.postid = postid;
    this.usuarioid = usuarioid;
    this.nome_autor = nome_autor;
    this.conteudo = conteudo;
  }
}
