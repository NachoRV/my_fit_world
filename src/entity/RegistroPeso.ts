import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from "typeorm";
import { User } from "./User";

  @Entity()
  export class Registro_peso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: Date;

    @Column({ type: "float" })
    peso: number;

    @Column({ type: "float" })
    grasa: number;

    @Column({ type: "float" })
    g_bisceral: number;

    @Column({ type: "float" })
    musculo: number;

    @ManyToOne(type => User, user => user.peso)
    user: User;

  }