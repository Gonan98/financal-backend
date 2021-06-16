import { config } from 'dotenv';

config();

export default {
    db_name: process.env.DB_NAME || 'financaldb',
    db_host: process.env.DB_HOST || 'localhost',
    port: process.env.PORT || 5000,
    token_secret: process.env.TOKEN_SECRET || 'mysecrettoken'
}