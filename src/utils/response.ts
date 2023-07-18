import { Response } from "express";

export const responseApi = (response: Response, code: number, data?: any, message: string = "", error: boolean = false) => {
  if (message.trim().length > 0) {
    return response.status(code).json({ error, message, data })
  }
  return response.status(code).json({ error, data })
}
