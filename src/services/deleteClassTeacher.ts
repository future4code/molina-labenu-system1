import { connection } from "../data/connection"

export const deleteClassTeacher = async(id:string)=>{
    await connection("teacher")
    .update({
        class_id:null
    })
    .where({id})
}