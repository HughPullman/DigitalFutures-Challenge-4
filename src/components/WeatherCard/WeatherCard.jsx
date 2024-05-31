import "./WeatherCard.css";

const WeatherCard = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <span>Next Day Name</span>
      <img src="/public/assets/weather-icons/02d.svg" alt="" />
      <span>X C</span>
      <span>Weather Desc</span>
    </div>
  );
};
export default WeatherCard;
