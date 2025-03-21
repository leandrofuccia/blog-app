import { Entity, PrimaryColumn, Column } from "typeorm";
import { IPerfil } from "./models/perfil.interface";

@Entity({ name: 'perfil' })
export class Perfil implements IPerfil {
    @PrimaryColumn()
    id?: number;

    @Column({ name: 'perfil', type: 'varchar', unique: true })
    perfil: string;

    constructor(perfil: string) {
        this.perfil = perfil;
    }
}
