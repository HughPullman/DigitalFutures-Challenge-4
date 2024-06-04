import "./WeatherOnly.css";

import WeatherCard from "../WeatherCard/WeatherCard";

const WeatherOnly = ({ weatherData }) => {
  const kelvinConst = 273.15;

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

  const days = updateState(weatherData);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center weatherOnly">
      <div className="title d-flex flex-column align-items-center justify-content-center bg-black bg-gradient p-3">
        <h1>Telling you about...</h1>
        <h1>{weatherData.city.name}</h1>
      </div>
      <div className="addFavourites bg-black bg-gradient p-3">
        <img src="/assets/img/favorite-48.png" alt="" />
        <span>Click to add to favourites</span>
      </div>
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
