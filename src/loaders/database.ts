import { connect } from 'mongoose';

export const connectToDB = async (mongoUrl: string) => await connect(
    mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
