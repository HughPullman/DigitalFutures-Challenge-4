import "./App.css";

import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import WeatherOnly from "./components/WeatherOnly/WeatherOnly";

const App = () => {
  return (
    <>
      <Navbar />
      <Home />
      <WeatherOnly />
      <Footer />
    </>
  );
};

export default App;
