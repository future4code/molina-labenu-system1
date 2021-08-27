import { Request, Response } from "express";
import { deleteClassStudent } from "../services/deleteClassStudent";

export const deleteStudentClass = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (!id) {
      res.statusCode = 422
      throw " 'id' não existe! "
    }
    await deleteClassStudent(id)
    res.status(200).send("professor deletado da turma com sucesso")
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