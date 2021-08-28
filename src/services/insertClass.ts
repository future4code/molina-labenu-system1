import { connection } from "../data/connection";
import { newClass, registeredClass } from "../types";

export default async function insertClass(body: newClass): Promise<registeredClass> {

    const isExistClass = await connection("class").count("* as res").where({ name: body.name })

    if (isExistClass[0].res >= 1) {
        throw new Object({
            status: 406,
            message: "Invalid or missing Body Property Value",
            tips: `Name '${body.name}' already exist`
        })
    }

    try {
        await connection("class")
            .insert(body)
    } catch (err) {
        throw new Object({
            status: 500,
            message: err.message,
            tips: "Internal error"
        })
    }

    const consultRegister = await connection("class").select("*").where({ name: body.name })
    
    const covertDate = (input:Date) => {
    return `${input.getFullYear()}/${(((input.getMonth()+1)*0.01)% 1).toFixed(2).substring(2)}/${input.getDate()}`
    }

    const result: registeredClass = {
        id: consultRegister[0].id,
        name: consultRegister[0].name,
        type: consultRegister[0].type,
        startDate: covertDate(consultRegister[0].start_date),
        endDate: covertDate(consultRegister[0].end_date),
        module: consultRegister[0].module
    }


    return result
}