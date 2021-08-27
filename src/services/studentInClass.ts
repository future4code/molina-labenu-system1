import { connection } from "../data/connection"

export const studentInClass = async(id:number,classID:number)=>{
    await connection("student")
    .update({
        class_id:classID
    })
    .where({id})
}