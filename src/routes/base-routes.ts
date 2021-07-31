import Express, {Request, Response} from "express";

export const router = Express.Router();

// GET /{url_path}
router.get('/:urlPath', (req: Request, res: Response) => res.send('Implement me!'));
