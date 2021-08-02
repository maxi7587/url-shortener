import express, { Express } from 'express';
import compression from 'compression';
import { connectToDB } from './loaders/database';
import 'reflect-metadata';
import { router as apiRoutes } from './routes/api-routes';
import { router as baseRoutes } from './routes/base-routes';
import { Server } from 'http';

export async function startServer(host: string, port: number, mongoUrl: string): Promise<Server> {
    // Connect to database
    await connectToDB(mongoUrl)
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

    return app.listen(port, host);
}
