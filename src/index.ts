import Server from "./server";
import { logger } from "./shared/logger";


(() => {
    logger.info(`Initializing app...`);
    const server = new Server(3000);
    server.setup();
})();