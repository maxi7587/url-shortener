import { Request, Response } from 'express';
import { Service } from 'typedi';
import { UrlService } from '../services/url-service';

@Service()
export class ApiController{
    public constructor(
        private readonly urlService: UrlService
    ) {
        this.encode = this.encode.bind(this);
        this.decode = this.decode.bind(this);
        this.getStatistics = this.getStatistics.bind(this);
        this.list = this.list.bind(this);
    }

    public async encode(req: Request<{original_url: string}>, res: Response) {
        const { original_url: originalUrl } = req.body;

        if(!originalUrl) {
            const msg = 'Bad request: original_url must be included in body.';
            console.info(`[ApiController][encode] ${msg}`);
            res.status(400).send(msg);
        }

        try {
            const url = await this.urlService.create(originalUrl);
            // if encode count is 0, return code 201. 200 if greater.
            const responseCode = url.encodeCount === 0 ? 201 : 200;
            await this.urlService.increaseEncodeCount(url.urlPath);

            return res.status(responseCode).json({short_url: url.shortUrl}).send();
        } catch (err) {
            console.error('[ApiController][encode] Unexpected error encoding URL.');
            console.info(err);
            res.status(500).send(err);
        }
    }

    public async decode(req: Request, res: Response) {
        console.error('Implement me!');
    }

    public async getStatistics(req: Request, res: Response) {
        console.error('Implement me!');
    }

    public async list(req: Request, res: Response) {
        console.error('Implement me!');
    }
}
