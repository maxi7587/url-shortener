import { Url, UrlModel } from '../models/url-model';
import { Service } from 'typedi';
import { FilterQuery, UpdateQuery } from 'mongoose';

@Service()
export class UrlRepository {
    public async get(urlPath: string) {
        try {
            return UrlModel.findOne({urlPath});
        } catch (err) {
            console.error(`[UrlRepository][get] Error getting URL with urlPath: ${urlPath}`);
            throw err;
        }
    }

    public async getAll(limit: number, offset: number) {
        try {
            return UrlModel.find().limit(limit).skip(offset);
        } catch (err) {
            console.error('[UrlRepository][getAll] Error getting all URLs.');
            throw err;
        }
    }

    public async findOne(filter: FilterQuery<Url>): Promise<Url|null> {
        try {
            return UrlModel.findOne(filter);
        } catch (err) {
            console.error(`[UrlRepository][findOne] Error finding URL with filters: ${filter}`);
            throw err;
        }
    }

    public async create(url: Url): Promise<Url> {
        try {
            const urlModel = new UrlModel(url);
            return urlModel.save();
        } catch (err) {
            console.error(`[UrlRepository][create] Error saving URL: ${url}`);
            throw err;
        }
    }

    public async increaseRedirectCount(urlPath: string) {
        await this.findOneAndUpdate(
            urlPath,
            {
                $inc: {redirectCount : 1},
                $set: {lastRedirect: new Date()}
            }
        );
    }

    public async increaseDecodeCount(urlPath: string) {
        await this.findOneAndUpdate(
            urlPath,
            {
                $inc: {decodeCount : 1},
                $set: {lastDecode: new Date()}
            }
        );
    }

    public async increaseEncodeCount(urlPath: string) {
        await this.findOneAndUpdate(
            urlPath,
            {
                $inc: {encodeCount : 1},
                $set: {lastEncode: new Date()}
            }
        );
    }

    private async findOneAndUpdate(urlPath: string, updateQuery: UpdateQuery<Url>): Promise<void> {
        try {
            await UrlModel.findOneAndUpdate(
                {urlPath},
                updateQuery
            );
        } catch (err) {
            console.error(`[UrlRepository][findOneAndUpdate] Error updating resource with urlPath "${urlPath}"`);
            throw err;
        }
    }
}
