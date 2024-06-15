import "./WeatherCard.css";

const WeatherCard = ({ weather, day }) => {
  const dayOfWeek = () => {
    const dayNo = new Date(weather[day].date).getDay();
    switch (dayNo) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  };

  return (
    <div className="d-flex flex-column align-items-center weatherCard bg-black bg-gradient m-2 mx-5">
      <span>{dayOfWeek()}</span>
      <img src={`/assets/weather-icons/${weather[day].icon}.svg`} alt="" />
      <span>{weather[day].temp} &deg;C</span>
      <span>
        {weather[day].weather_desc.charAt(0).toUpperCase() +
          weather[day].weather_desc.slice(1)}
      </span>
    </div>
  );
};
export default WeatherCard;
