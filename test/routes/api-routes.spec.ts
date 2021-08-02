import {Server} from "http";
import { startServer } from '../../src/server';
import dotenv from "dotenv";
import {Url, UrlModel} from "../../src/models/url-model";
import {nanoid} from "nanoid";
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';

dotenv.config({path: 'src/config/.env'});

// Get constants from environment variables
const PORT: number = parseInt(process.env.PORT, 10);
const HOST: string = process.env.HOST;

describe('POST /api/encode', () => {
    let server: Server;
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        // Start MongoDB Memory Server
        mongoServer = await MongoMemoryServer.create();
        // Start app server connection to memory Server URI
        server = await startServer(HOST, PORT, mongoServer.getUri());
    });

    afterEach(async () => {
        try {
            // remove previous test data from DB
            await mongoose.connection.dropDatabase();
        } catch (error) {
            console.log(`Error trying to drop database ${error}`);
            throw error;
        }
    });

    afterAll(async () => {
        try {
            // Disconnect from DB, stop DB server and stop Server
            await mongoose.disconnect();
            await mongoServer.stop();
            await server.close();
        } catch (error) {
            console.log(`error trying to disconnect from DB, stop DB server and stop Server ${error}`);
            throw error;
        }
    });

    it('Should return a new short URL', async () => {
        const res = await supertest(server)
            .post('/api/encode')
            .send({
                original_url: 'https://www.google.com'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('short_url');
        const baseUrl = process.env.BASE_URL.replace(/^https?:\/\//, '');

        // check that the returned URL contains our app base URL and a valid urlPath
        const urlRegEx = new RegExp(`${baseUrl}\/[A-Za-z0-9_-]+`);

        // short URL must contain the app's BASE_URL and a valid string
        expect(res.body.short_url).toMatch(urlRegEx);
    });

    it('if the URL has been encoded before, POST should return the existing short URL and increase encodeCount metric', async () => {
        const originalUrl = 'https://www.google.com';


        let urlModel: Url|null = await UrlModel.findOne({originalUrl});

        // No model must be in the DB for the current originalUrl
        expect(urlModel).toBeFalsy();

        const baseUrl = process.env.BASE_URL;
        const urlPath = nanoid();
        const shortUrl = `${baseUrl}/${urlPath}`;

        urlModel = await UrlModel.create({
            originalUrl,
            shortUrl,
            urlPath,
            redirectCount: 0,
            lastRedirect: null,
            decodeCount: 0,
            lastDecode: null,
            encodeCount: 1,
            lastEncode: new Date(),
            createdAt: new Date()
        });

        // urlModel must have been created
        expect(urlModel).not.toBeFalsy();

        const res = await supertest(server)
            .post('/api/encode')
            .send({
                original_url: originalUrl
            });

        // status code must be 200 (OK) instead of 201 (CREATED)
        expect(res.statusCode).toEqual(200);
        // should return existing short URL
        expect(res.body.short_url).toBe(urlModel.shortUrl);

        const updatedUrlModel = await UrlModel.findOne({originalUrl});
        if (updatedUrlModel === null)
            // if udpatedUrlModel is null, throw inconsistency error
            throw new Error(`DB data inconsistency found: there should be an entry for ${originalUrl}`);

        // should increase encodeCount metric
        expect(updatedUrlModel.encodeCount).toBe(urlModel.encodeCount + 1);
    });
});
