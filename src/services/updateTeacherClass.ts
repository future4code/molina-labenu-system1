import { connection } from "../data/connection";

export default async function updateTeacherClass(body: any): Promise<any> {
    try {
        await connection("teacher")
            .where({ id: body.teacherId })
            .update({ class_id: body.classId })

        try {
            const consultRegister = await connection("teacher")
                .join("class", "teacher.class_id", "=", "class.id")
                .where("teacher.id", "=", body.teacherId)
                .select("teacher.id as teacherId",
                    "teacher.name as teacherName",
                    "teacher.class_id as classId",
                    "class.name as className",
                    "class.type as classType",
                    "class.module as classModule")

            return consultRegister
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
}