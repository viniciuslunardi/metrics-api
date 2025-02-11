import { Request, Response } from "express";
import { logger } from "../../shared/logger";

import { faker } from '@faker-js/faker';

const users: Array<{ userId: string, username: string, email: string, birthdate: Date }> = [];

class UsersController {

    constructor() {
        logger.debug(`Creating users controller`);
        for (let i = 0; i <= 99; i++) {
            //generate 100 users
            users.push({
                userId: faker.string.uuid(),
                username: faker.internet.username(), 
                email: faker.internet.email(),
                birthdate: faker.date.birthdate(),
            })
        }
    }

    async getRandomUser(req: Request, res: Response): Promise<Response<{ userId: string, username: string, email: string, birthdate: Date }>> {

        const usersLength = users.length;

        const index = Math.floor(Math.random() * (usersLength - 0 + 1) + 0);
        logger.info("getting user at index", index)
        return res.send(users[index]);
    }
}

export default new UsersController();