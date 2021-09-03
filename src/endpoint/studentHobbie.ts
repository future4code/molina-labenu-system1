import { Request, Response } from "express";
import { hobbies } from "../services/hobbies";



export const studentHobbie = async (req: Request, res: Response): Promise<void> => {
    try {

        const hobby: string = req.params.hobbyName
        const result = await hobbies(hobby)

        if (result.length === 0) {
            res.statusCode = 422
            throw "'Hobby' doesn't exist!"
        }

        res.status(200).send(result)

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
