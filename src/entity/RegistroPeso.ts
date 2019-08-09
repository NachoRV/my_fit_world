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

    @Column()
    peso: number;

    @Column()
    grasa: number;

    @Column()
    g_bisceral: number;

    @Column()
    musculo: number;

    @ManyToOne(type => User, user => user.peso)
    user: User;

  }