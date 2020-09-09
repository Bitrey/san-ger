import { Router, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status-codes";
import weatherAPI from "../api/weather";
import logger from "../logger";

const router = Router();

/**
 * This function comment is parsed by doctrine
 * @route GET /weather
 * @group weather - Weather data
 * @returns {object} 200 - Weather data object
 * @returns {Error}  500 - API call failed
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const weather = await weatherAPI();
        res.send(weather);
    } catch (err) {
        logger.error(err);
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
});

export default router;
