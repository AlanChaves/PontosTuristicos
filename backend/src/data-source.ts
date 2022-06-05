import { DataSource } from "typeorm";
import { Ponto } from "./entity/Ponto";
import { root } from "./paths";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: `${root}\\data\\db.sqlite`,
    synchronize: true,
    logging: false,
    entities: [Ponto],
    subscribers: [],
    migrations: [],
})