import express from "express";
import cors from "cors";
import responseTime from "response-time";
import { router } from "../routes";
import { logger } from "../shared/logger";
import { metricsMiddleware , register } from "../shared/metrics";



class Server {
    constructor(private readonly port: number) {}

    setup() {
        const app = express();
        
        app.use(cors());
        app.use(express.json());
        

        app.use(metricsMiddleware);

        app.use(responseTime((req, res, time) => {
            logger.info(`[${req.method}] ${req.url} - ${time.toFixed(2)}ms`);
        }));

        app.use('/api', router);
        app.listen(this.port, () => {
            logger.info(`Server running on port ${this.port}`);
        })
       
        
        app.get("/metrics", async (req, res) => {
          res.set("Content-Type", register.contentType);
          res.end(await register.metrics());
        });
    }
}

export default Server;

