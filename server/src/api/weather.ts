import axios from "axios";
import { config } from "../config";

const { cityName } = config.api;
const { baseURL, key } = config.api.openWeatherMap;

const getWeather = (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const params = { q: cityName, appid: key, lang: "it" };
            const { data } = await axios.get(baseURL, { params });
            // Remove useless properties
            delete data.coord;
            delete data.base;
            delete data.timezone;
            delete data.dt;
            delete data.id;
            delete data.cod;
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
};

export default getWeather;
