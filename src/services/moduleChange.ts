import { connection } from "../data/connection"

export const moduleChange = async(id:number,newModule:number)=>{
    await connection("class")
    .update({
        module:newModule
    })
    .where({id})
}