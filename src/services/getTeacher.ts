import { connection } from "../data/connection"

export const getTeacher = async(id:number)=>{
    const result = await connection("teacher")
    return result
}