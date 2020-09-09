import logger from "../logger";

// Setup swagger
import "./swagger";

// Setup environment variables
import "./dotenv";

export const config = Object.freeze({
    api: {
        cityName: "San Cesario sul Panaro",
        province: "MO",
        sanGerCoords: "44.561956,11.034125",
        sanGerInverted: "11.034125, 44.561956",
        openWeatherMap: {
            baseURL: "http://api.openweathermap.org/data/2.5/weather/",
            key: process.env.OPEN_WEATHER_MAP_KEY
        },
        mapQuest: {
            baseURL: "http://open.mapquestapi.com/directions/v2/route",
            key: process.env.MAPQUEST_KEY
        },
        google: {
            baseURL: "https://maps.googleapis.com/maps/api/directions/json",
            key: process.env.GOOGLE_KEY
        },
        openRoute: {
            baseURL: "https://api.openrouteservice.org",
            directonsURL: "/v2/directions/driving-car",
            key: process.env.OPENROUTE_KEY
        }
    }
});

// Check env have loaded
if (typeof config.api.openWeatherMap.key !== "string") {
    // throw new AppError(
    //     "BAD_ENV",
    //     ErrorNames.INVALID_API_KEY,
    //     500,
    //     "No Open Weather Map key provided",
    //     false
    // );
    logger.error("No Open Weather Map key provided");
    process.exit(1);
} else if (typeof config.api.openRoute.key !== "string") {
    logger.error("No GrassHopper key provided");
    process.exit(1);
}
