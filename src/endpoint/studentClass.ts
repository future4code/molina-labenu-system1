import { Request, Response } from "express";
import { connection } from "../data/connection";

export const studentClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.classId)
    const result = await connection.raw(`
      SELECT class_id,student.name,class.name from class
      JOIN student
      ON class.id = student.class_id
      WHERE class.id="${id}"
    `)
    console.log(result[0])
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
