import { connection } from "../data/connection"

export const deleteClassStudent = async (id: string) => {
  await connection("student")
    .update({
      class_id: null
    })
    .where({ id })
}