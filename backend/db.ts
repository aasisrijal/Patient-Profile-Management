import knex from "knex";
import * as config from "./knexfile";

const env = process.env.NODE_ENV || "development";
const options = config[env];

const knexConnection = knex(options);

export default knexConnection;
