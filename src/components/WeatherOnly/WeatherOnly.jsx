import "./WeatherOnly.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import weatherData from "../../../data/dummyWeatherData.json";

const WeatherOnly = () => {
  const weather = weatherData.dublin.list;
  const kelvinConst = 273.15;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center weatherOnly">
      <div className="title d-flex flex-column align-items-center justify-content-center bg-black bg-gradient p-3">
        <h1>Telling you about...</h1>
        <h1>Dublin</h1>
      </div>
      <div className="addFavourites bg-black bg-gradient p-3">
        <img src="/assets/img/favorite-48.png" alt="" />
        <span>Click to add to favourites</span>
      </div>
      <div className="todayWeather bg-black bg-gradient p-4">
        <div className="todayWeatherHead p-3 d-flex flex-column align-items-center">
          <h3>Today's Weather:</h3>
          <h5>{weather[0].dt_txt}</h5>
        </div>
        <img
          src={`/assets/weather-icons/${weather[0].weather[0].icon}.svg`}
          alt=""
        />
        <span>{(weather[0].main.temp - kelvinConst).toFixed(1)} &deg;C</span>
        <span>{weather[0].weather[0].description}</span>
      </div>
      <div className="weatherCards d-flex flex-row">
        <WeatherCard weather={weather} kelvinConst={kelvinConst} day={1} />
        <WeatherCard weather={weather} kelvinConst={kelvinConst} day={2} />
        <WeatherCard weather={weather} kelvinConst={kelvinConst} day={3} />
        <WeatherCard weather={weather} kelvinConst={kelvinConst} day={4} />
      </div>
    </div>
  );
};
export default WeatherOnly;
