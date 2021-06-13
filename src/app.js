import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => res.send('Hello!'));

export default app;