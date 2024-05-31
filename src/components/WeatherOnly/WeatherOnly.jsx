import "./WeatherOnly.css";

import WeatherCard from "../WeatherCard/WeatherCard";

const WeatherOnly = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Telling you about...</h1>
      <h1>Place name</h1>
      <div className="addFavourites">
        <button></button>
        <span>Click to add to favourites</span>
      </div>
      <h3>Today's Weather:</h3>
      <h5>Day, Xth Mon, Year</h5>
      <div className="todayWeather">
        <img src="/public/assets/weather-icons/01d.svg" alt="" />
        <span>X C</span>
        <span>Weather Desc</span>
      </div>
      <div className="weatherCards d-flex flex-row">
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </div>
    </div>
  );
};
export default WeatherOnly;
