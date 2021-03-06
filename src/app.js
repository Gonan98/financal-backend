import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import customerRoutes from './routes/customer.routes';
import authRoutes from './routes/auth.routes';
import portfolioRoutes from './routes/portfolio.routes';
import letterRoutes from './routes/letter.routes';
import detailRoutes from './routes/portfolio-detail.routes';

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/portfolios', portfolioRoutes);
app.use('/api/v1/letters', letterRoutes);
app.use('/api/v1/details', detailRoutes);

export default app;