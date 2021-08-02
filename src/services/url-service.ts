import { isUri } from 'valid-url';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import { UrlRepository } from '../repositories/url-repository';
import { Url } from '../models/url-model';

@Service()
export class UrlService {
    public constructor(
        private readonly urlRepository: UrlRepository
    ) {}

    public async create(originalUrl: string): Promise<Url> {
        const base = process.env.BASE_URL;

        if (!isUri(originalUrl)) {
            console.info('[UrlService][create] Bad request: invalid original URL')
            throw new Error(`Invalid original URL: "${originalUrl}".`);
        }

        try {
            let url = await this.urlRepository.findOne({originalUrl});
            if (!url) {
                const urlPath = nanoid();
                const shortUrl = `${base}/${urlPath}`;

                url = await this.urlRepository.create({
                    originalUrl,
                    shortUrl,
                    urlPath,
                    redirectCount: 0,
                    lastRedirect: null,
                    decodeCount: 0,
                    lastDecode: null,
                    encodeCount: 0,
                    lastEncode: new Date(),
                    createdAt: new Date()
                });
            }
            return url;
        } catch (err) {
            console.error('[UrlService][create] Error trying to create URL.');
            throw err;
        }
    }

    public async increaseRedirectCount(urlPath: string) {
        try {
            await this.urlRepository.increaseRedirectCount(urlPath);
        } catch (err) {
            console.error('[UrlService][increaseRedirectCount] Error trying increase redirect count.');
            throw(err);
        }
    }

    public async increaseEncodeCount(urlPath: string) {
        try {
            await this.urlRepository.increaseEncodeCount(urlPath);
        } catch (err) {
            console.error('[UrlService][increaseEncodeCount] Error trying to increase encode count.');
            throw(err);
        }
    }

    public async increaseDecodeCount(urlPath: string) {
        try {
            await this.urlRepository.increaseDecodeCount(urlPath);
        } catch (err) {
            console.error('[UrlService][increaseDecodeCount] Error trying to increase decode count.');
            throw(err);
        }
    }
}
