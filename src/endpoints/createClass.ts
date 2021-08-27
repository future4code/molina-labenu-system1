import express, { Express, Request, Response } from "express"
import { newClass } from '../types'

export function validateUserBody(actionType: "new" | "edit", body: any) {
   const expectedObject: Array<string> = ["name", "type", "startDate", "endDate"]
   const errorTips: Array<any> = []
   const checkers: any = {
      isValidBodyLength: (input: any) => {
         return Object.keys(input).length === expectedObject.length
      },
      isValidBodyKeys: (input: any) => {
         return Object.getOwnPropertyNames(input)
            .map((item: any) => expectedObject
               .includes(item)).every(item => item === true)
      },
      isValidName: (input: any) => {
         if (input.trim().length > 0 && input.trim().length <= 255) {
            if (!isNaN(input) || input.split("").some((item: any) => Number(item))) {
               errorTips.push("Invalid name. Only letter is acceptable")
               return false
            } else {
               return true
            }
         } else {
            errorTips.push("Name is empty or longer than 255 characters")
            return false
         }
      },
      isValidType: (input: any) => {
         if (input.trim().length > 0 && input.trim().length <= 255) {
            if (!isNaN(input) || input.split("").some((item: any) => Number(item))) {
               errorTips.push("Invalid name. Only letter is acceptable")
               return false
            } else if (!["integral", "noturno"].includes(input.toLowerCase())) {
               errorTips.push("Invalid value on type key. Acceptable values: 'integral' or 'noturno'")
               return false
            } else {
               return true
            }
         } else {
            errorTips.push("Type is empty or longer than 255 characters")
            return false
         }
      },
      isValidDate: (input: any, keyName: any) => {
         if (input.trim().length > 0 && input.trim().length <= 255) {
            if (
               !Date.parse(input.split("/").map((item: any) => {
                  return Number(item) > 0 && !isNaN(item) && item
               }))
            ) {
               errorTips.push(`${keyName} value must YYYY/MM/DD formart`)
               return false
            } else {
               const today = new Date().getFullYear() + new Date().getMonth() * 0.1 + new Date().getDate() * 0.1
               const insertedDate = new Date(input).getFullYear() + new Date(input).getMonth() * 0.1 + new Date(input).getDate() * 0.1
               if (insertedDate < today) {
                  errorTips.push(`'${keyName}' value must be higher than current date`)
                  return false
               } else {
                  return true
               }
            }
         } else {
            errorTips.push("Date is empty or longer than 255 characters")
            return false
         }
      },
      isValidEndDate: (input: any) => {
         if (!expectedValues.startDate) {
            errorTips.push("Impossible to check 'endDate' once 'startDate' is invalid or missing")
            return false
         } else {
            const endDate = new Date(input).getFullYear() + new Date(input).getMonth() * 0.1 + new Date(input).getDate() * 0.1
            const startDate = new Date(body.startDate).getFullYear() + new Date(body.startDate).getMonth() * 0.1 + new Date(body.startDate).getDate() * 0.1
            if (startDate >= endDate) {
               errorTips.push("'enDate' must be higher than startDate")
               return false
            } else {
               return true
            }
         }
      }
   }

   const expectedValues: any = {
      name: (input: any) => checkers.isValidName(input),
      type: (input: any) => checkers.isValidType(input),
      startDate: (input: any) => checkers.isValidDate(input, "startDate"),
      endDate: (input: any) => checkers.isValidDate(input,"endDate") && checkers.isValidEndDate(input),
   }

   const validationType: any = {
      new: {
         keys: (input: any) => checkers.isValidBodyLength(input) && checkers.isValidBodyKeys(input),
         values: (input: any) => Object.getOwnPropertyNames(input)
            .map(item => { return expectedValues[item](input[item]) })
            .every(item => item === true)
      },
      edit: {
         keys: (input: any) => checkers.isValidBodyKeys(input),
         values: (input: any) => Object.getOwnPropertyNames(input)
            .map(item => { return expectedValues[item](body[item]) })
            .every(item => item === true)
      }
   }

   if (!body) {
      throw new Object({ status: 400, message: "Empty Body" })
   } else if (!validationType[actionType].keys(body)) {
      throw new Object({
         status: 406,
         message: "Invalid or missing Body Property Key",
         tips: `Expected properties keys: ${expectedObject}`
      })
   } else if (!validationType[actionType].values(body)) {
      throw new Object({
         status: 406,
         message: "Invalid or missing Body Property Value",
         tips: errorTips
      })
   } else {
      return true
   }
}


export const createClass = async (req: Request, res: Response) => {
   // const { name, type, startDate, endDate } = req.body
   try {
   await validateUserBody("new",req.body)
   
      res.status(200).send("belezinha").end()
   
   } catch (err){
      res.status(err.status).send({message: err.message, error: err.tips}).end()
   }

}