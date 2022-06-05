import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import routes from "./routes";
import { env } from "process";
import { AppDataSource } from "./data-source";

async function startup() {
    await AppDataSource.initialize();
    const app = express();

    const PORT = env.PORT || 3000;

    app.use(express.json());
    app.use(cors());
    app.use("/api", routes);

    app.listen(PORT, () => {
        console.log("App running on port " + PORT);
    });
}

startup();
