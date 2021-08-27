import { connection } from "../data/connection"

export const getStudantsByID = async(id:string)=>{
    const result = await connection("student")
    .where({id})
    return result[0]
}