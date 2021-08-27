import { Request, Response } from "express";
import { connection } from "../data/connection";

export const addStudent = async(req:Request,res:Response):Promise<void>=>{
    try{
        const {name,email,birth_date,hobby}=req.body
        if(!name || !email || !birth_date || !hobby){
            res.statusCode=422
            throw "'name', 'email', 'birth_date' ou 'hobby' não digitados "
        }
        await connection("student")
        .insert({
            name:name,
            email:email,
            birth_date:birth_date
        })
        await connection("hobby")
        .insert({
            name:hobby
        })
         const userId = await connection.raw(`SELECT id FROM student WHERE email="${email}"`)
         const hobbyId = await connection.raw(`SELECT id FROM hobby WHERE name="${hobby}"`)
         console.log(userId[0][0])
        console.log(hobbyId[0][0])
        await connection("student_hobby")
        .insert({
            student_id:userId[0][0].id,
            hobby_id:hobbyId[0][0].id
        })
        res.status(200).send("ok")
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