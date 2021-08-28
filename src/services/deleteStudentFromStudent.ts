import { connection } from '../data/connection'

export async function deleteStudentFromStudent(studentId: number): Promise<any> {
    try {
        const isExistStudent = await connection("student").count("* as res").where({ id: studentId })

        if (isExistStudent[0].res === 0) {
            throw new Object({
                status: 406,
                message: "Invalid or missing Body Property Value",
                tips: `ID '${studentId}' does not exist`
            })
        }
       
        try {

            await connection("student_hobby")
                .where("student_id", "=", studentId)
                .delete()

            try {
                await connection("student")
                    .where("id", "=", studentId)
                    .delete()
            } catch (err) {
                throw new Object({
                    status: 500,
                    message: err.message,
                    tips: "Internal error"
                })
            }


        } catch (err) {
            if (err.errno === 1452) {
                throw new Object({
                    status: 404,
                    message: "Invalid or missing Body Property Value",
                    tips: "Not found ID of 'classId'"
                })
            } else {

            }
            throw new Object({
                status: 500,
                message: err.message,
                tips: "Internal error"
            })
        }
    } catch (err) {
        throw err
    }
}