import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import WeatherOnly from "./components/WeatherOnly/WeatherOnly";

const App = () => {
  const [weatherData, setWeatherData] = useState({});

  const updateWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home updateWeatherData={updateWeatherData} />}
        />
        <Route
          path="/weatherOnly"
          element={<WeatherOnly weatherData={weatherData} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
