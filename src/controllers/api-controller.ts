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
            res.status(400).json(msg);
        }

        try {
            const url = await this.urlService.create(originalUrl);
            // if encode count is 0, return code 201. 200 if greater.
            const responseCode = url.encodeCount === 0 ? 201 : 200;
            await this.urlService.increaseEncodeCount(url.urlPath);

            return res.status(responseCode).json({short_url: url.shortUrl}).send();
        } catch (err) {
            const msg = 'Unexpected error encoding URL.';
            console.error(`[ApiController][encode] ${msg}`);
            console.info(err);
            res.status(500).json({msg});
        }
    }

    public async decode(req: Request, res: Response) {
        const { url_path: urlPath } = req.query;

        if (typeof urlPath !== 'string') {
            const msg = 'Bad request: Missing query parameter "url_path".';
            console.info(`[ApiController][decode] ${msg}`);
            return res.status(400).json({msg});
        }

        try {
            const url = await this.urlService.get(urlPath);
            await this.urlService.increaseDecodeCount(urlPath);
            return res.send(url);
        } catch (err) {
            const msg = '[ApiController][decode] Unexpected error decoding URL.';
            console.error(msg);
            console.info(err);
            return res.status(500).json({msg});
        }
    }

    public async getStatistics(req: Request, res: Response) {
        const { urlPath } = req.params;

        if(!urlPath) {
            const msg = 'Bad request: missing required param "urlPath"';
            console.info(`[ApiController][list] ${msg}`);
            res.status(400).json({msg});
        }

        try {
            const url = await this.urlService.get(urlPath);
            return res.send(url);
        } catch (err) {
            const msg = `Unexpected error getting statistics for url path "${urlPath}"`;
            console.error(`[ApiController][getStatistics] ${msg}`);
            console.info(err);
            res.status(500).json({msg});
        }
    }

    public async list(req: Request<null, any, any, {limit: number, offset: number}>, res: Response) {
        const { limit, offset } = {...{limit: 10, offset: 0}, ...req.query};

        if (typeof limit !== "number" || typeof offset !== "number") {
            const msg = 'Invalid query params: limit and offset must be numbers.';
            console.info(`[ApiController][list] ${msg}`);
            return res.status(400).json({msg})
        }

        try {
            const url = await this.urlService.all(limit, offset);
            return res.send(url);
        } catch (err) {
            const msg = 'Unexpected error getting URLs list.';
            console.error(`[ApiController][list] ${msg}`);
            console.info(err);
            res.status(500).send({msg});
        }
    }
}
