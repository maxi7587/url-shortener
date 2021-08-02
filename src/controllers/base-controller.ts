import { Request, Response } from 'express';
import { Service } from 'typedi';
import { UrlService } from '../services/url-service';

@Service()
export class BaseController{
    public constructor(
        private readonly urlService: UrlService
    ) {
        this.redirect = this.redirect.bind(this);
    }

    public async redirect(req: Request, res: Response) {
        const urlPath = req.params.urlPath;

        if (!urlPath) {
            const msg = 'Bad request: Missing required para "urlPath".';
            console.info(`[BaseController][redirect] ${msg}`);
            return res.status(400).send(msg)
        }

        try {
            const url = await this.urlService.get(urlPath);
            if (url) {
                // todo: this may lead to race conditions as the app scales... didn't improve it because of a lack of time
                await this.urlService.increaseRedirectCount(url.urlPath);
                return res.redirect(url.originalUrl);
            } else res.status(404).send('Not found');
        } catch (err) {
            console.error('[BaseController][redirect] Unexpected error trying to redirect.');
            console.info(err);
            res.status(500).send('Internal Server Error');
        }
    }
}
