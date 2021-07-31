import express, { Express } from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectToDB } from './loaders/database';
import "reflect-metadata";
import { router as apiRoutes } from './routes/api-routes';
import { router as baseRoutes } from './routes/base-routes';

dotenv.config({path: 'src/config/.env'});

const main = async () => {
    // Get constants from environment variables
    const PORT: number = parseInt(process.env.PORT, 10);
    const HOST: string = process.env.HOST;
    const MONGO_URL: string = process.env.MONGO_URL;

    // Connect to database
    await connectToDB(MONGO_URL)
        .then(() => console.log('Successfully connected to database.'))
        .catch(err => {
            console.log('Error connecting to database.');
            console.log(err);
            process.exit(1);
        });

    // Launch Express app
    const app: Express = express();

    // Compression
    app.use(compression());

    // Body Parser
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/api', apiRoutes);
    app.use('/', baseRoutes);

    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
};

main().catch(err => {
    console.error(err);
});
