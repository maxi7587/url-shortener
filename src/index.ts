import express, {Express, Request, Response} from 'express';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config({path: 'src/config/.env'});

// Constants
const PORT: number = parseInt(process.env.PORT, 10);
const HOST: string = process.env.HOST;

// App
const app: Express = express();
app.use(compression());
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
