import express from 'express';
import routes from './routes';
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors({}));
app.use(express.json());
// API Routes
app.use('/api', routes);


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});