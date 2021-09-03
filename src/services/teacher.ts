import { connection } from "../data/connection"

export const teacherSS = async (name: string, email: string, birth_date: Date, skill_name: string) => {
   try{ await connection("teacher")
        .insert({
            name: name,
            email: email,
            birth_date: birth_date
        })
    await connection("skill")
        .insert({
            name: skill_name
        })
    const teacherId = await connection.raw(`SELECT id FROM teacher WHERE email="${email}"`)
    const skillId = await connection.raw(`SELECT id FROM skill WHERE name="${skill_name}"`)
    console.log(skillId,teacherId)
    await connection("teacher_skill")
        .insert({
            teacher_id: teacherId[0][0].id,
            skill_id: skillId[0][0].id
        })
    } catch (err) {
        console.log(err)
        return err
    }
}