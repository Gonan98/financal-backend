import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const host = process.env.DB_HOST;
const database = process.env.DB_NAME;

mongoose.connect(
    `mongodb://${host}/${database}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(db => console.log('Database connection successfully'))
    .catch(err => console.error(err));