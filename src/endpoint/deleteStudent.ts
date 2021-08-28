import { Request, Response } from "express";
import { deleteStudentFromStudent } from "../services/deleteStudentFromStudent";

export function validateParams(param: any | void) {
    if (!param) {
        throw new Object({
            status: 400,
            message: "Invalid or missing path params",
            tips: "'studentId' is required"
        })
    } else if (!Number.isInteger(param * 1)) {
        throw new Object({
            status: 400,
            message: "Invalid or missing path params",
            tips: "'studentId' value must be a number"
        })
    } else {
        return true
    }
}

export async function deleteStudent(req: Request, res: Response): Promise<any> {
    try {
        if (validateParams(req.params.studentId)) {
            const result = await deleteStudentFromStudent(Number(req.params.studentId))
            return res.status(200).send(`Success to DELETE 'studentId':${req.params.studentId}`).end()
        }
    } catch (err) {
        res.status(err.status)
            .send({ message: err.message, error: err.tips })
            .end()
    }
}