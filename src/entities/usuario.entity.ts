import { IUsuario } from "./models/usuario.interface"
import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "./postagem.entity"
import { Credencial } from "./credencial.entity"

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

    @Column({
      name: 'credencialid',
      type: 'int4'
    })
    credencialId?: number

    @OneToMany(() => Postagem, postagem => postagem.usuarioid)

    @OneToOne(() => Credencial, credencial => credencial.usuario)
    @JoinColumn({ name: 'credencialid' })  // Usar @JoinColumn para especificar a coluna de junção
    credencial?: Credencial;

    @JoinTable({
      name: 'postagem',
      joinColumn:{
        name :'usuarioid',
        referencedColumnName: 'id',
      },

    })
    
       
    
    postagens?: Postagem[];

   
    constructor(nome: string, perfilid: number) {
      this.nome = nome
      this.perfilid = perfilid
    }
  }
  