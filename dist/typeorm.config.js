import { DataSource } from "typeorm";
import { Productivity } from "./entities/productivity.entity.js";
import { Languages } from "./entities/language.entity.js";
export const productivityDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Alhasgdkyuiodsag27183296ahgajksf",
    database: "productivity",
    entities: [Productivity, Languages],
    logging: false,
    synchronize: true,
});
