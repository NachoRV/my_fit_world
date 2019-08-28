import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Registro_peso } from "../entity/RegistroPeso";
import {getConnection} from "typeorm";


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
        rp.user = res.locals.jwtPayload.userId;
        console.info(rp);
        const userRepository = getRepository(Registro_peso);
        try {
          await userRepository.save(rp);
        } catch (e) {
          res.status(409).send("error!!!!");
          return;
        }
      
        //If all ok, send 201 response
        res.status(201).send("Registro añadid");
    }
    static editWeight = async (req: Request, res: Response) => {
      //Get the ID from the url
      const id = req.params.id;
    
      //Get values from the body
      const { fecha, g_bisceral, grasa, musculo, peso } = req.body;
    
      //Try to find user on database
      const userRepository = getRepository(Registro_peso);
      let rp;
      try {
        rp = await userRepository.findOneOrFail(id);
      } catch (error) {
        //If not found, send a 404 response
        res.status(404).send("not found");
        return;
      }
      //Validate the new values on model
      rp.fecha = fecha;
      rp.g_bisceral = g_bisceral;
      rp.grasa = grasa;
      rp.musculo = musculo;
      rp.peso = peso;
      rp.user = res.locals.jwtPayload.userId;
      const errors = await validate(rp);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
    
      //Try to safe, if fails, that means username already in use
      try {
        await userRepository.save(rp);
      } catch (e) {
        res.status(409).send("username already in use");
        return;
      }
      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
    };
    
    static deleteWeight = async (req: Request, res: Response) => {
      //Get the ID from the url
      const id = req.params.id;
    
      const userRepository = getRepository(Registro_peso);
      let rp: Registro_peso;
      try {
        rp = await userRepository.findOneOrFail(id);
      } catch (error) {
        res.status(404).send("User not found");
        return;
      }
      userRepository.delete(id);
    
      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
    };
      
} 
export default RegistroPesoController;