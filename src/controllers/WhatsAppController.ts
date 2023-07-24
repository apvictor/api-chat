import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { responseApi } from "../utils/response";

const prisma = new PrismaClient();

export const WhatsAppController = {
  async messages(request: Request, response: Response) {
    try {
      const { from } = request.params

      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { from: from },
            { to: from },
          ],
          NOT: { from: "status" }
        }
      });

      const contact = await prisma.message.findFirst({ where: { from: from }, orderBy: { timestamp: "desc" } })

      return responseApi(response, 200, {
        "contact": contact,
        "messages": messages,
      })
    } catch (error: any) {
      return responseApi(response, 500, null, error.message, true)
    }
  },
  async contacts(request: Request, response: Response) {
    try {
      const contacts = await prisma.message.groupBy({
        by: ["from"],
        where: {
          NOT: [
            { from: "status" },
            { fromMe: true }
          ]
        }
      })

      let contactsDetails = []
      for (let i = 0; i < contacts.length; i++) {
        const contact = await prisma.message.findFirst({ where: { from: contacts[i].from }, orderBy: { timestamp: "desc" } })
        contactsDetails.push(contact)
      }

      return responseApi(response, 200, { "contacts": contactsDetails })
    } catch (error: any) {
      return responseApi(response, 500, null, error.message, true)
    }
  },
  async sendMessage(request: Request, response: Response) {
    try {
      const contacts = await prisma.message.groupBy({
        by: ["from"],
        where: {
          NOT: [
            { from: "status" },
            { fromMe: true }
          ]
        }
      })

      let contactsDetails = []
      for (let i = 0; i < contacts.length; i++) {
        const contact = await prisma.message.findFirst({ where: { from: contacts[i].from }, orderBy: { timestamp: "desc" } })
        contactsDetails.push(contact)
      }

      return responseApi(response, 200, { "contacts": contactsDetails })
    } catch (error: any) {
      return responseApi(response, 500, null, error.message, true)
    }
  },
}
