import { connection } from "../data/connection"

export const hobbies = async (hobby: string)=> {
    const result = await connection.raw(`
        select student.name from student_hobby
        join student
        on student_hobby.student_id=student.id
        join hobby
        on student_hobby.hobby_id = hobby.id
        where hobby.name = "${hobby}"
        `)
        return result [0]
}