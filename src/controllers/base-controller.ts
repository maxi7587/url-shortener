import { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export class BaseController{
    public async redirect(req: Request, res: Response) {
        console.error('Implement me!');
    }
}
