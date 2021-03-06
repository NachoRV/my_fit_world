import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from "typeorm";
  
  import { Length, IsNotEmpty } from "class-validator";
  import {Registro_peso} from "./RegistroPeso";
  import * as bcrypt from "bcryptjs";
  
  @Entity()
  @Unique(["username"])
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 20)
    username: string;
  
    @Column()
    @Length(4, 100)
    password: string;
  
    @Column()
    @IsNotEmpty()
    role: string;
   
    @OneToMany(type => Registro_peso, registro_peso => registro_peso.user)
    peso: Registro_peso[];
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }
