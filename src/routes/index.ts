import { Router } from "express";
import HealthController from "../controller/health";
import UsersControler from "../controller/users";

const router = Router();
//@ts-ignore
router.get("/v1/health", HealthController.getHealth);
//@ts-ignore
router.get("/v1/users/random", UsersControler.getRandomUser);


export { router };