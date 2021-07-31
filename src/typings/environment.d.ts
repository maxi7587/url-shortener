declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: string;
            HOST: string;
            MONGO_URL: string;
            BASE_URL: string;
        }
    }
}

// using export converts this file into a module.
export {}
