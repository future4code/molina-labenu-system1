import { Request, Response } from "express";
import { moduleChange } from "../services/moduleChange";

export const changeModule =async(req:Request,res:Response):Promise<void>=>{
    try{
        const id=Number(req.params.id)
        const newModule = Number(req.body.newModule)+1

        if(!newModule){
            res.statusCode=422
            throw "'new module' preenchido incorretamente"
        }
        if(newModule>7){
            res.statusCode = 422
            throw "não existem modulos maiores que 7!"
        }
        await moduleChange(id,newModule)
        res.status(200).send("Módulo trocado com sucesso!")
    }
    catch(error){
        if(typeof error==="string"){
            res.send(error)
        }
        else{
            res.status(500).send({message: error.sqlMessage || error.message})
        }
    }
}