import { Request, Response } from "express";
import { hobbies } from "../services/hobbies";



export const studentHobbie =async(req:Request,res:Response):Promise<void>=>{
    try{
        const hobby:string = req.params.hobby
        const result = await hobbies(hobby)
        console.log("algo")
        console.log(hobby)
        console.log(result)
        res.status(200).send(result)
        
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
