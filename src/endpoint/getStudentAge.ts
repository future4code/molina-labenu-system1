import { Request, Response } from "express";
import { connection } from "../data/connection";
import { getStudantsByID } from "../services/getStudantsByID";
import { student } from "../types";

export const getStudentAge = async(req:Request,res:Response)=>{
    try{
        const id = req.params.id
        const result:student = await getStudantsByID(id)
        if(!result){
            res.statusCode=422
            throw "'id' não existe"
        }
        const today = new Date().getFullYear() + new Date().getMonth() * 0.1
        const birthday = new Date(result.birth_date).getFullYear() + new Date(result.birth_date).getMonth() * 0.1
        const age=Math.trunc(today-birthday)
        res.status(200).send(`A idade do estudante ${result.name} é ${age}`)
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