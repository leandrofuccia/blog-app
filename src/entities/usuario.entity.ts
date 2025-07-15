import { IUsuario } from "./models/usuario.interface"
import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "./postagem.entity"
import { Credencial } from "./credencial.entity"
import { Perfil } from "./perfil.entity"
import { Comentario } from "./comentario.entity"

@Entity({
  name: 'usuario',
})
export class Usuario implements IUsuario {

    @PrimaryGeneratedColumn('increment',{
      name: 'id',
    })
    id?: number | undefined

    @Column({
      name: 'nome',
      type: 'varchar'
    })
    nome: string
    
    @Column({
      name: 'perfilid',
      type: 'int'
    })
    perfilid: number

    @Column({
      name: 'datacriacao',
      type: process.env.NODE_ENV === "test" ? "text" : "timestamp without time zone",
      default: () => process.env.NODE_ENV === "test" ? "CURRENT_TIMESTAMP" : "'now()'"
    })
    datacriacao?: Date

    @Column({
      name: 'ultimologin',
      type: process.env.NODE_ENV === "test" ? "text" : "timestamp without time zone",
      default: () => process.env.NODE_ENV === "test" ? "CURRENT_TIMESTAMP" : "'now()'"
    })
    ultimologin?: Date

    @Column({
      name: 'credencialid',
      type: 'int'
    })
    credencialId?: number

    @OneToMany(() => Postagem, postagem => postagem.usuarioid)

    @OneToOne(() => Credencial, credencial => credencial.usuario)
    @JoinColumn({ name: 'credencialid' })
    credencial?: Credencial;

    @ManyToOne(() => Perfil, perfil => perfil.id)
    @JoinColumn({ name: 'perfilid' })
    usuarios: Usuario[];

    @JoinTable({
      name: 'postagem',
      joinColumn:{
        name :'usuarioid',
        referencedColumnName: 'id',
      },

    })

    @OneToMany(() => Comentario, comentario => comentario.usuario)
    comentario?: Comentario[];


    postagens?: Postagem[];
   
    constructor(nome: string, perfilid: number) {
      this.nome = nome
      this.perfilid = perfilid
    }
  }
  