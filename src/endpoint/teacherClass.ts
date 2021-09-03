import { Request, Response } from "express";
import { connection } from "../data/connection";

export const teacherClass = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.classId)
        const result = await connection.raw(`
        SELECT teacher.name as teacherName from class
        JOIN teacher
        ON class.id = teacher.class_id
        WHERE class.id="${id}"
        `)

        res.status(200).send(result[0])
    }
    catch (error) {
        if (typeof error === "string") {
            res.send(error)
        }
        else {
            res.status(500).send({ message: error.sqlMessage || error.message })
        }
    }
}
