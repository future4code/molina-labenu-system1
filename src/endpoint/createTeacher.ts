import { Request, Response } from "express";
import { teacherSS } from "../services/teacher"
 
export async function createTeachers (req: Request, res: Response): Promise <void> {
    try {

        const { name, email, birth_date, class_id } = req.body

        if(!name || !email || !birth_date){
            res.statusCode = 422
            throw "Dude.. put your'name', 'email', 'address' and your 'class_id' please"
        }

        //não preciso passar o ID pq o auto_increment completa automaticamente

       await teacherSS ( name, email, birth_date, class_id)

        res.status(200).send(`Teacher created successfully"`)

    } catch (error){

        if(typeof error === "string") {

            res.send(error)
        } else {
         
            console.log(error.sqlMessage || error.message);
            res.status(500).send("Dude... i don't know what's going on -.-")
         }

    }
}

