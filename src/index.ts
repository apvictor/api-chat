import 'dotenv/config'
import express from "express";
import bodyParser from "body-parser";

import { serve, setup } from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";

import { router } from "./router";

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use("/", serve, setup(swaggerFile));

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT ?? 3000}`);
})

