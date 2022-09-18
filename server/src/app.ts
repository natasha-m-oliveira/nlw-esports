import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './routes';

const app = express();

app.use(bodyParser.json());
// pode ser passado um objeto com a origem permitidas
// {origin: 'https://test.com' }
app.use(cors());
app.use(router);

export { app };
