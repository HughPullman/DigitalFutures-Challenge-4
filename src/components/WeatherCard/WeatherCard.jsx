import "./WeatherCard.css";

const WeatherCard = ({ weather, kelvinConst, day }) => {
  return (
    <div className="d-flex flex-column align-items-center weatherCard bg-black bg-gradient m-2 mx-5">
      <span>Next Day Name</span>
      <img
        src={`/assets/weather-icons/${weather[day].weather[0].icon}.svg`}
        alt=""
      />
      <span>{(weather[day].main.temp - kelvinConst).toFixed(1)} &deg;C</span>
      <span>{weather[day].weather[0].description}</span>
    </div>
  );
};
export default WeatherCard;
