import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    'postgres',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        }
    }
);