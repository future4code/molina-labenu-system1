import { Request, Response } from "express";
import { connection } from "../data/connection";
import { studentInClass } from "../services/studentInClass";


export const addStudentInClass = async(req:Request,res:Response)=>{
    try{
        const classID:number =Number(req.body.classID)
        const id = Number(req.params.studentId)
        if(!classID){
            res.statusCode=422
            throw "'classId' não preenchidos "
        }
        if(!id){
            res.statusCode=422
            throw "'id' não existente"
        }
        await studentInClass(id,classID)
        res.status(200).send("usuário criado")
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