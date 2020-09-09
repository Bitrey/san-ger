import { Router, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from "http-status-codes";
import directionsAPI from "../api/directions";
import logger from "../logger";

const router = Router();

/**
 * This function comment is parsed by doctrine
 * @route GET /directions
 * @group dicretions - Directions from current position
 * @param {string} latitude.query.required - Latitude of starting point
 * @param {string} longitude.query.required - Longitude of starting point
 * @returns {object} 200 - Directions in GeoJSON format
 * @returns {Error}  500 - API call failed
 */

interface Coords {
    latitude: string | number;
    longitude: string | number;
}

router.get("/", async (req: Request, res: Response) => {
    try {
        const { coords } = req.query;

        logger.debug(`Nuova richiesta direzioni: ${coords}`);

        // No coords = bad request
        if (typeof coords !== "string") return res.sendStatus(BAD_REQUEST);

        const parsedCoords: Coords = JSON.parse(coords);
        const { latitude, longitude } = parsedCoords;

        const directions = await directionsAPI(latitude, longitude);
        res.send(directions);
    } catch (err) {
        logger.error(err);
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
});

export default router;
