import { connection } from "../data/connection"

export const teacherSS = async (name: string, email: string, birth_date: Date) => {
    await connection("teacher")
        .insert({
            name: name,
            email: email,
            birth_date: birth_date
        })
}