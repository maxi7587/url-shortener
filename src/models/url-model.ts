import { Schema, model } from 'mongoose';

export interface Url {
    urlPath: string;
    originalUrl: string;
    shortUrl: string;
    redirectCount: number;
    lastRedirect: Date|null;
    decodeCount: number;
    lastDecode: Date|null;
    encodeCount: number;
    lastEncode: Date;
    createdAt: Date;
}

const UrlSchema = new Schema<Url>({
    urlPath: {
        type: String,
        required: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    redirectCount: {
        type: Number,
        required: true,
        default: 0,
    },
    lastRedirect: {
        type: Number,
        required: false
    },
    decodeCount: {
        type: Number,
        required: true,
        default: 0,
    },
    lastDecode: {
        type: Date,
        required: false
    },
    encodeCount: {
        type: Number,
        required: true,
        default: 0
    },
    lastEncode: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

export const UrlModel = model<Url>('Url', UrlSchema);
