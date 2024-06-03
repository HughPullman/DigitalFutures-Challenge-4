import "./WeatherCard.css";

const WeatherCard = ({ weather, day }) => {
  const dayOfWeek = () => {
    const dayNo = new Date(weather[day].date).getDay();
    switch (dayNo) {
      case 0:
        return "Sunday";
        break;
      case 1:
        return "Monday";
        break;
      case 2:
        return "Tuesday";
        break;
      case 3:
        return "Wednesday";
        break;
      case 4:
        return "Thursday";
        break;
      case 5:
        return "Friday";
        break;
      case 6:
        return "Saturday";
        break;
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
