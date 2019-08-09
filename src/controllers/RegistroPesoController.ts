import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Registro_peso } from "../entity/RegistroPeso";


class RegistroPesoController {

    static list = async (req: Request, res: Response) => {
        //Get users from database
       const userRepository = getRepository(Registro_peso);
        const rp = await userRepository.find();
        res.send(rp);
      };

    static add = async (req: Request, res: Response) => {
        let { fecha, peso, g_bisceral, grasa, musculo, user } = req.body;
        

        let rp = new Registro_peso();
        rp.fecha = fecha;
        rp.g_bisceral = g_bisceral;
        rp.grasa = grasa;
        rp.musculo = musculo;
        rp.peso = peso;
        rp.user = user;
        const userRepository = getRepository(Registro_peso);
        try {
          await userRepository.save(rp);
        } catch (e) {
          res.status(409).send("username already in use");
          return;
        }
      
        //If all ok, send 201 response
        res.status(201).send("User created");

    }

      
} 
export default RegistroPesoController;