import Express from "express";
import { BaseController } from "../controllers/base-controller";
import { Container } from "typedi";

export const router = Express.Router();

const baseController = Container.get(BaseController);

// GET /{url_path}
router.get('/:urlPath', baseController.redirect);
