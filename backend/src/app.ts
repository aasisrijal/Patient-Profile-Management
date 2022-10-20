import express from "express";
import routes from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { handleError } from "./middlewares/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors({}));
app.use(bodyParser.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
