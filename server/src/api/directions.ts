import axios from "axios";
import { config } from "../config";

import qs from "qs";

const { sanGerInverted } = config.api;

const { baseURL, key, directonsURL } = config.api.openRoute;

const getDirections = (
    latitude: string | number,
    longitude: string | number
): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const reversedCoords = `${longitude},${latitude}`;

            const { data } = await axios({
                method: "GET",
                url:
                    "https://api.openrouteservice.org/v2/directions/driving-car",
                params: {
                    api_key: key,
                    start: reversedCoords,
                    end: sanGerInverted
                },
                headers: {
                    Accept:
                        "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8"
                }
            });

            resolve(data);
        } catch (err) {
            console.log(err?.response?.data?.error);
            reject(err);
        }
    });
};

export default getDirections;
