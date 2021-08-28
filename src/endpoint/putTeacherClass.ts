import express, { Request, Response } from 'express'
import updateTeacherClass from '../services/updateTeacherClass'

export function validateBody(actionType: "new" | "edit", body: any) {
   const expectedObject: Array<string> = ["classId"]
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
      isValidClassId: (input: any, keyName: any) => {
         if (input.trim().length > 0 && input.trim().length <= 255) {
            if (!Number.isInteger(input * 1)) {
               errorTips.push(`'${keyName}' value must be a number`)
               return false
            } else {
               return true
            }
         } else {
            errorTips.push(`'${keyName}' is empty or longer than 255 characters`)
            return false
         }
      }
   }

   const expectedValues: any = {
      classId: (input: any) => checkers.isValidClassId(input, "classId")
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

export function validateParams(param: any | void) {
   if (!param) {
      throw new Object({
         status: 400,
         message: "Invalid or missing path params",
         tips: "'teacherId' is required"
      })
   } else if (!Number.isInteger(param * 1)) {
      throw new Object({
         status: 400,
         message: "Invalid or missing path params",
         tips: "'teacherId' value must be a number"
      })
   } else {
      return true
   }
}

export const putTeacherClass = async (req: Request, res: Response): Promise<any> => {
   try {
      if (validateParams(req.params.teacherId) && validateBody("new", req.body)) {

         const body = {
            teacherId: Number(req.params.teacherId),
            classId: Number(req.body.classId * 1)
         }
         const result = await updateTeacherClass(body)

         if(!result[0] || !result){
            throw new Object({
               status: 404,
               message: "Invalid or missing path params",
               tips: "Not found ID of 'teacherId'"
            })
         } else {
            return res.status(200).send(result[0]).end()
         }

      }
   } catch (err) {
      res.status(err.status)
         .send({ message: err.message, error: err.tips })
         .end()
   }
}