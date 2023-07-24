import 'dotenv/config'
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { Client, LocalAuth } from "whatsapp-web.js"
import qrcode from "qrcode"
import qrcodeterminal from "qrcode-terminal"
import cors from "cors"

import { serve, setup } from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";

import { router } from "./router";
import { PrismaClient } from '@prisma/client';

const app = express()

app.use(cors({
  origin: 'https://web-chat-eight.vercel.app'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({ authStrategy: new LocalAuth({ clientId: "5511995052373" }) });

let QRCODE = "TESTE"

client.on("qr", (qr) => {
  console.log("GENERATE QRCODE");
  // QRCODE = await qrcode.toDataURL(qr)

  qrcodeterminal.generate(qr, { small: true });
});

app.get("/", async (req: Request, res: Response) => {
  return res.send(`<img src="${QRCODE}"><img/>`)
})

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  const prisma = new PrismaClient();

  message.getChat()
    .then(chat => {
      chat.fetchMessages({}).then(async messages => {

        console.log(messages[0]);

        for (let i = 0; i < messages.length; i++) {

          const message = await prisma.message.findFirst({
            where: { timestamp: `${messages[i].timestamp}` }
          });

          if (!message && messages[i].body.length > 0 && messages[i].from != "status") {
            let contact = await messages[i].getContact();

            await prisma.message.create({
              data: {
                name: contact.name == undefined ? contact.pushname : contact.name,
                fromMe: messages[i].fromMe,
                message: messages[i].body,
                to: messages[i].to.split("@")[0],
                from: messages[i].from.split("@")[0],
                timestamp: `${messages[i].timestamp}`,
              }
            });
          }
        }
      })
    });
});

client.initialize();

app.use(router);

// app.use("/", serve, setup(swaggerFile));

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT ?? 3000}`);
})

