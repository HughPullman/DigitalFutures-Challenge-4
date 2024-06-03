import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import WeatherOnly from "./components/WeatherOnly/WeatherOnly";

import { getWeather } from "./utils/weather.service";

const App = () => {
  const [weatherData, setWeatherData] = useState({});

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weatherOnly" element={<WeatherOnly />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
