import axios from "axios";

export const getWeather = async (location) => {
    try {
        const weatherDataResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=f6072dcc578f566f3da82c9c5e773d80`);
        return weatherDataResponse.data;
    } catch (e) {
        return e;
    }
}