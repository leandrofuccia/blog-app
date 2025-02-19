import { IUsuario } from "./models/usuario.interface"
import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "./postagem.entity"

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
      name: 'email',
      type: 'varchar'
    })
    email: string
    
    @Column({
      name: 'senha',
      type: 'varchar'
    })
    senha?: string

    @Column({
      name: 'perfilid',
      type: 'int4'
    })
    perfilid: number

    @Column({
      name: 'datacriacao',
      type: 'timestamp without time zone',
      default: () => 'CURRENT TIMESTAMP'
    })
    datacriacao?: Date

    @Column({
      name: 'ultimologin',
      type: 'timestamp without time zone',
      default: () => 'CURRENT TIMESTAMP'
    })
    ultimologin?: Date

    @OneToMany(() => Postagem, postagem => postagem.usuarioid)

    @JoinTable({
      name: 'postagem',
      joinColumn:{
        name :'usuarioid',
        referencedColumnName: 'id',
      },

    })
    
       
    
    postagens?: Postagem[];

   
    constructor(nome: string, email:string, perfilid: number) {
      this.nome = nome
      this.email = email
      this.perfilid = perfilid
    }
  }
  