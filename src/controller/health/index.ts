import { Request, Response } from "express";
import { logger } from "../../shared/logger";

class HealthController {
    constructor() {}

    async getHealth(req: Request, res: Response): Promise<Response<{ message: string, status: number }>> {
        logger.info("Health check accessed");
        return res.send({ status: 200, message: `Health is OK`});
    }
}

export default new HealthController();