import { Request, Response } from "express";
import { teacherSS } from "../services/teacher"
import { connection } from "../data/connection";

export async function createTeachers(req: Request, res: Response): Promise<any> {

    try {

        const { name, email, birth_date, skill_name } = req.body

        if (!name || !email || !birth_date || !skill_name) {
            res.statusCode = 422
            throw "Dude.. put your'name', 'email', 'address' and 'skill_name' please"
        }

        //não preciso passar o ID pq o auto_increment completa automaticamente
        
        const result = await connection("teacher")
            .insert({
                name: name,
                email: email,
                birth_date: birth_date
            })
        
        await connection("skill")
            .insert({
                name: skill_name
            })
        const teacherId = await connection.raw(`SELECT id FROM teacher WHERE email="${email}"`)
        const skillId = await connection.raw(`SELECT id FROM skill WHERE name="${skill_name}"`)
        await connection("teacher_skill")
            .insert({
                teacher_id: teacherId[0][0].id,
                skill_id: skillId[0][0].id
            })

        res.status(200).send(`Teacher created successfully"`)

    } catch (error) {

        if (typeof error === "string") {

            res.send(error)
        } else {
            res.status(500).send(error.sqlMessage || error.message)
        }

    }
}

