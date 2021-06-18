import './database';
import app from './app';
import config from './config';
import initData from './data';

function main() {
    //initData();
    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);
    });
}

main();