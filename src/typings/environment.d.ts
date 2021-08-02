declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            PORT: string;
            HOST: string;
            MONGO_URL: string;
            BASE_URL: string;
        }
    }
}

export {}
