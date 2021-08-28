import { connection } from "../data/connection"

export const deleteClassTeacher = async (id: number) => {
    try {
        const isExistTeacher = await connection("teacher").count("* as res").where({ id: id })

        if (isExistTeacher[0].res === 0) {
            throw new Object({
                status: 406,
                message: "ID '${id}' does not exist"
            })
        }
        try {
            await connection("teacher")
                .update({
                    class_id: null
                })
                .where({ id })
        } catch (err) {
            return err
        }
    } catch (err) {
        return err
    }
}