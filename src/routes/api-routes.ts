import Express from "express";
import { ApiController } from "../controllers/api-controller";
import { Container } from "typedi";

export const router = Express.Router();

const apiController = Container.get(ApiController);

// POST /api/encode
router.post('/encode', apiController.encode);
// GET /api/decode
router.get('/decode', apiController.decode);
// GET /api/statistic/{url_path}
router.get('/statistic/:urlPath', apiController.getStatistics);
// GET /api/list
router.get('/list', apiController.list);
