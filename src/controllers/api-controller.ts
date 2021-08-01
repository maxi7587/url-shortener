import { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export class ApiController{
    public constructor() {
        this.encode = this.encode.bind(this);
        this.decode = this.decode.bind(this);
        this.getStatistics = this.getStatistics.bind(this);
        this.list = this.list.bind(this);
    }

    public async encode(req: Request, res: Response) {
        console.error('Implement me!');
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
