import knex from "knex";
import  { attachPaginate } from 'knex-paginate';

import * as config from "../knexfile";

const env = process.env.NODE_ENV || "development";
const options = config[env];

const knexConnection = knex(options);
attachPaginate();

export default knexConnection;
