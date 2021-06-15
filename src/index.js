import './database';
import app from './app';

function main() {
    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

}

main();