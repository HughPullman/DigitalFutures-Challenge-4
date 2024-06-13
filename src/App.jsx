import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { getWeather } from "./utils/weather.service";

import "./App.css";

import ErrorModal from "./components/ErrorModal/ErrorModal";
import Footer from "./components/Footer/Footer";
import FavouriteLocations from "./components/FavouriteLocations/FavouriteLocations";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import WeatherOnly from "./components/WeatherOnly/WeatherOnly";
import Register from "./components/Register/Register";
import ChangePassword from "./components/ChangePassword/ChangePassword";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const updateWeatherData = (data) => {
    setWeatherData(data);
  };

  const handleModal = () => {
    setModal(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await getWeather(searchLocation);
    const responseStatus = data.cod;
    if (responseStatus === "200") {
      updateWeatherData(data);
      navigate("/weatherOnly");
    } else {
      setModal(true);
      setModalError(data.response.data.message);
    }
  };

  const selectLocation = async (selectedLocation) => {
    const data = await getWeather(selectedLocation);
    const responseStatus = data.cod;
    if (responseStatus === "200") {
      updateWeatherData(data);
      navigate("/weatherOnly");
    } else {
      setModal(true);
      setModalError(data.response.data.message);
    }
  };

  const handleUserId = (userId) => {
    setUserId(userId);
  };

  return (
    <>
      <Navbar
        handleSearch={handleSearch}
        setSearchLocation={setSearchLocation}
        searchLocation={searchLocation}
        handleUserId={handleUserId}
        userId={userId}
        selectLocation={selectLocation}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleSearch={handleSearch}
              setSearchLocation={setSearchLocation}
              searchLocation={searchLocation}
            />
          }
        />
        <Route
          path="/weatherOnly"
          element={<WeatherOnly weatherData={weatherData} userId={userId} />}
        />
        <Route path="/login" element={<Login handleUserId={handleUserId} />} />
        <Route
          path="/favouriteLocations"
          element={
            <FavouriteLocations
              userId={userId}
              selectLocation={selectLocation}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/passChange" element={<ChangePassword />} />
      </Routes>
      <ErrorModal error={modalError} show={modal} handleClose={handleModal} />
      <Footer />
    </>
  );
};

export default App;
