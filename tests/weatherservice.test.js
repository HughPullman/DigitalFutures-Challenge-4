import { beforeEach, expect } from "vitest";
import axios from "axios";
import { getWeather } from "../src/utils/weather.service";

vi.mock('axios');

const mockLocation = "MockLocation";


describe("Weather service tests", () => {
    beforeEach(() => {
        axios.mockReset();
    });

    it("should make a get request and return data", async () => {
        axios.get.mockResolvedValue({
            data: "MockData"
        });

        const getWeatherRes = await getWeather(mockLocation);

        expect(axios.get).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/forecast?q=${mockLocation}&appid=f6072dcc578f566f3da82c9c5e773d80`);
        expect(getWeatherRes).toEqual( "MockData" );
    });


    it("should return an error when the request fails", async () => {
        axios.get.mockResolvedValue(
            { data: new Error("Network Error") }
        );

        const getWeatherRes = await getWeather(mockLocation);

        expect(axios.get).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/forecast?q=${mockLocation}&appid=f6072dcc578f566f3da82c9c5e773d80`);
        expect(getWeatherRes).toEqual(new Error("Network Error"));
    })
});