import {Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { ICredencial } from "./models/credencial.interface";

@Entity({
  name: 'credencial',
})
export class Credencial implements ICredencial {

    @PrimaryGeneratedColumn('increment', {
      name: 'id',
    })
    id?: number | undefined;

    @Column({
      name: 'username',
      type: 'varchar',
      unique: true,
    })
    username: string;

    @Column({
      name: 'password',
      type: 'varchar',
    })
    password: string;
    
    @OneToOne(() => Usuario, usuario => usuario.credencial)
    usuario?: Usuario;
    
    constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
    }
}
