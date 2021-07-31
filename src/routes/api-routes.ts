import Express, { Request, Response } from "express";

export const router = Express.Router();

// POST /api/encode
router.post('/encode', (req: Request, res: Response) => res.send('Implement me!'));
// GET /api/decode
router.get('/decode', (req: Request, res: Response) => res.send('Implement me!'));
// GET /api/statistic/{url_path}
router.get('/statistic/:urlPath', (req: Request, res: Response) => res.send('Implement me!'));
// GET /api/list
router.get('/list', (req: Request, res: Response) => res.send('Implement me!'));
