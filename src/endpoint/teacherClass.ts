import { Request, Response } from "express";
import { connection } from "../data/connection";

export const teacherClass = async(req:Request,res:Response):Promise<void>=>{
    try{
        const id = Number(req.params.id)
        const result=await connection.raw(`
        SELECT class_id,teacher.name,class.name from class
        JOIN teacher
        ON class.id = teacher.class_id
        WHERE class.id="${id}"
        `)
        console.log(result[0])
        res.status(200).send(result[0])
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
