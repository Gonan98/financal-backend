import mongoose from 'mongoose';
import config from './config';


mongoose.connect(
    `mongodb://${config.db_host}/${config.db_name}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(db => console.log('Database connection successfully'))
    .catch(console.error);