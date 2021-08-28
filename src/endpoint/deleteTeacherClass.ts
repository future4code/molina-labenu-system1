import { Request, Response } from "express";
import { deleteClassTeacher } from "../services/deleteClassTeacher";
import { getTeacher } from "../services/getTeacher";

export const deleteTeacherClass = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.teacherId)
        if (!id) {
            res.statusCode = 422
            throw " 'id' doesn't exist! "
        }
        const result = await getTeacher(id)
        const checkId = result.find((x) => {
            return x.id === id
        })
        if (!checkId) {
            res.statusCode = 422
            throw " 'id' doesn't exist! "
        }
        await deleteClassTeacher(id)
        res.status(200).send("Teacher delete sucesfully")
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