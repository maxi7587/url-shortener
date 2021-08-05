import dotenv from 'dotenv';
import { startServer } from './server';

dotenv.config({path: 'src/config/.env'});

const main = async () => {
    // Get constants from environment variables
    const PORT: number = parseInt(process.env.PORT, 10);
    const HOST: string = process.env.HOST;
    const MONGO_URL: string = process.env.MONGO_URL;

    await startServer(HOST, PORT, MONGO_URL);
    console.log(`Running on http://${HOST}:${PORT}`);
};

main().catch(err => {
    console.error(err);
});
