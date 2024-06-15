import "./WeatherOnly.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import {
  addLocation,
  deleteLocations,
  getLocations,
} from "../../utils/user.service";
import { useEffect, useState } from "react";

const WeatherOnly = ({ weatherData, userId }) => {
  const kelvinConst = 273.15;

  const [isFav, setIsFav] = useState(false);

  const getDayIndices = (data) => {
    let dayIndices = [0];
    let currentDay = data.list[0].dt_txt.slice(8, 10);

    for (let i = 1; i < data.list.length; i++) {
      let day = data.list[i].dt_txt.slice(8, 10);
      let hour = data.list[i].dt_txt.slice(11, 13);

      if (day !== currentDay && hour === "15") {
        dayIndices.push(i);
        currentDay = day;

        // Stop after finding 4 different days
        if (dayIndices.length === 5) {
          break;
        }
      }
    }
    return dayIndices;
  };

  const updateState = (data) => {
    const tempDays = [];
    const dayIndices = getDayIndices(data);

    for (let i = 0; i < 5; i++) {
      const currentData = data.list[dayIndices[i]];
      tempDays.push({
        date: currentData.dt_txt.slice(0, 11),
        weather_desc: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        temp: (currentData.main.temp - kelvinConst).toFixed(1),
      });
    }
    return tempDays;
  };

  const handleFavourite = async () => {
    if (isFav) {
      const res = await deleteLocations({
        id: userId,
        location: weatherData.city.name,
      });
      checkFavourite();
    } else {
      const res = await addLocation({
        id: userId,
        location: weatherData.city.name,
      });
      checkFavourite();
    }
  };

  const checkFavourite = async () => {
    const favourites = await getLocations({
      id: userId,
    });
    const favouriteLoc = favourites.data.userLocations;
    if (favouriteLoc.includes(weatherData.city.name)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  };

  useEffect(() => {
    checkFavourite();
  }, [weatherData]);

  const days = updateState(weatherData);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center weatherOnly">
      <div className="title d-flex flex-column align-items-center justify-content-center bg-black bg-gradient p-3">
        <h1>Telling you about...</h1>
        <h1>{weatherData.city.name}</h1>
      </div>
      {userId !== "" ? (
        <div
          className="addFavourites bg-black bg-gradient p-3 d-flex flex-row"
          onClick={handleFavourite}
          role="handleFav"
        >
          {isFav ? (
            <>
              <div className="favIcon">
                <img src="/assets/img/bookmark.png" alt="" />
              </div>
              <span>Click to remove from favourites</span>
            </>
          ) : (
            <>
              <div className="favIcon">
                <img src="/assets/img/bookmark-white.png" alt="" />
              </div>
              <span>Click to add to favourites</span>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="todayWeather bg-black bg-gradient p-4">
        <div className="todayWeatherHead p-3 d-flex flex-column align-items-center">
          <h3>Today's Weather:</h3>
          <h5>{days[0].date}</h5>
        </div>
        <img src={`/assets/weather-icons/${days[0].icon}.svg`} alt="" />
        <span>{days[0].temp} &deg;C</span>
        <span>
          {days[0].weather_desc.charAt(0).toUpperCase() +
            days[0].weather_desc.slice(1)}
        </span>
      </div>
      <div className="weatherCards d-flex flex-row align-items-center justify-content-center">
        <WeatherCard weather={days} day={1} />
        <WeatherCard weather={days} day={2} />
        <WeatherCard weather={days} day={3} />
        <WeatherCard weather={days} day={4} />
      </div>
    </div>
  );
};
export default WeatherOnly;
