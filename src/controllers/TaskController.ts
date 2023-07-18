import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { responseApi } from "../utils/response";

const prisma = new PrismaClient();

export const TaskController = {
  async getAll(request: Request, response: Response) {
    // #swagger.tags = ['Tarefas']
    // #swagger.summary = 'Endpoint para listar tarefas.'
    try {
      const tasks = await prisma.task.findMany()

      return responseApi(response, 200, tasks)
    } catch (error: any) {
      return responseApi(response, 500, null, error.message, true)
    }
  },

  async store(request: Request, response: Response) {
    // #swagger.tags = ['Tarefas']
    // #swagger.summary = 'Endpoint para criar uma tarefa.'
    try {
      const { name } = request.body

      if (name.trim().length == 0) return responseApi(response, 400, [], "Name is required", true)

      await prisma.task.create({ data: { name: name } })

      return responseApi(response, 200, [], "Task created")
    } catch (error: any) {
      return responseApi(response, 500, null, error.message, true)
    }
  },

  async getId(request: Request, response: Response) {
    // #swagger.tags = ['Tarefas']
    // #swagger.summary = 'Endpoint para obter uma tarefa.'
    try {
      const id: number = parseInt(request.params.id)

      const task = await prisma.task.findUniqueOrThrow({ where: { id: id } })

      return responseApi(response, 200, task)
    } catch (error: any) {
      return responseApi(response, 500, null, error.message, true)
    }
  },

  async update(request: Request, response: Response) {
    // #swagger.tags = ['Tarefas']
    // #swagger.summary = 'Endpoint para atualizar uma tarefa.'
    try {
      const id: number = parseInt(request.params.id)
      const { name } = request.body

      if (name.trim().length == 0) return responseApi(response, 400, [], "Name is required", true)

      await prisma.task.findUniqueOrThrow({ where: { id: id } })

      await prisma.task.update({ data: { name: name }, where: { id: id } })

      return responseApi(response, 200, [], "Task updated")
    } catch (error: any) {
      return responseApi(response, 500, null, error.message, true)
    }
  },

  async destroy(request: Request, response: Response) {
    // #swagger.tags = ['Tarefas']
    // #swagger.summary = 'Endpoint para deletar uma tarefa.'
    try {
      let id: number = Number.parseInt(request.params.id)

      const task = await prisma.task.findUniqueOrThrow({ where: { id: id } })

      await prisma.task.delete({ where: { id: task.id } })

      return responseApi(response, 200, [], "Task deleted")
    } catch (error: any) {
      return responseApi(response, 500, null, error.message, true)
    }
  },

}
