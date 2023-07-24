import { Router } from "express";
import { WhatsAppController } from "./controllers/WhatsAppController";

export const router = Router()

router.get("/contacts", WhatsAppController.contacts);
router.get("/messages/:from", WhatsAppController.messages);
router.post("/messages/:from", WhatsAppController.sendMessage);
