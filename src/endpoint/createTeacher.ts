import { Request, Response } from "express";
import { teacherSS } from "../services/teacher"

export async function createTeachers(req: Request, res: Response): Promise<void> {
    try {

        const { name, email, birth_date } = req.body

        if (!name || !email || !birth_date) {
            res.statusCode = 422
            throw "Dude.. put your'name', 'email' and 'address' please"
        }

        //não preciso passar o ID pq o auto_increment completa automaticamente

        await teacherSS(name, email, birth_date)

        res.status(200).send(`Teacher created successfully"`)

    } catch (error) {

        if (typeof error === "string") {

            res.send(error)
        } else {
            res.status(500).send(error.sqlMessage || error.message)
        }

    }
}

