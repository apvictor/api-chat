import { Router } from "express";
import { TaskController } from "./controllers/TaskController";

export const router = Router()

router.get("/tasks", TaskController.getAll);
router.post("/tasks", TaskController.store);
router.get("/tasks/:id", TaskController.getId);
router.put("/tasks/:id", TaskController.update);
router.delete("/tasks/:id", TaskController.destroy);
