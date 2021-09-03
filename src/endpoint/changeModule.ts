import { Request, Response } from "express";
import { connection } from "../data/connection";
import { moduleChange } from "../services/moduleChange";

export const changeModule = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.classId)
        const newModule = Number(req.body.newModule) + 1
        if (!newModule) {
            res.statusCode = 422
            throw "'new module' incorrect"
        }
        if (newModule > 7) {
            res.statusCode = 422
            throw "it doesn't exist newModule > 7 !"
        }
        const result = await connection("class")
            .where({ id })
        console.log(result)
        if (result.length === 0) {
            res.statusCode = 422
            throw "'id' doesn't exist !"
        }
        await moduleChange(id, newModule)
        res.status(200).send("newModule changed succesfully!")
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