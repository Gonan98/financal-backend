import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import customerRoutes from './routes/customer.routes';
import authRoutes from './routes/auth.routes';
import portfolioRoutes from './routes/portfolio.routes';
import termsRoutes from './routes/term.routes';
import costosRoutes from './routes/cost.routes';
import letterRoutes from './routes/letter.routes';

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/portfolios', portfolioRoutes);
app.use('/api/v1/letters', letterRoutes);
app.use('/api/v1/terms', termsRoutes);
app.use('/api/v1/costs', costosRoutes);
//app.use('/', (req, res) => res.status(200).json({ message: 'Hello!' }));

export default app;