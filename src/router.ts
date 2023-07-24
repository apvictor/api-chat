import { Router } from "express";
import { TaskController } from "./controllers/TaskController";
import { WhatsAppController } from "./controllers/WhatsAppController";

export const router = Router()

router.get("/tasks", TaskController.getAll);
router.post("/tasks", TaskController.store);
router.get("/tasks/:id", TaskController.getId);
router.put("/tasks/:id", TaskController.update);
router.delete("/tasks/:id", TaskController.destroy);

router.get("/contacts", WhatsAppController.contacts);
router.get("/messages/:from", WhatsAppController.messages);
router.post("/messages/:from", WhatsAppController.sendMessage);
