import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TopNavBar = () => {
  const [nowDate, setNowDate] = useState("");
  const [nowTime, setNowTime] = useState("");
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [airQuality, setAirQuality] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = now.toLocaleDateString("ko-KR", { weekday: "long" });
      const year = now.getFullYear().toString().slice(-2);
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const date = now.getDate().toString().padStart(2, "0");
      const time = now.toLocaleTimeString("ko-KR", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
      });

      const dateString = `${day} ${year}|${month}|${date}`;
      const timeString = `${time}`;

      setNowDate(dateString);
      setNowTime(timeString);
    };

    const updateWeather = () => {
      const weatherData = {
        weather: "Sunny",
        temperature: "25°C",
        airQuality: "Good",
      };

      setWeather(weatherData.weather);
      setTemperature(weatherData.temperature);
      setAirQuality(weatherData.airQuality);
    };

    const timer = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="top-nav-wrap">
      <h4 className="top-nav-date">{nowDate}</h4>
      <h4 className="top-nav-weather"></h4>
      <h2 className="top-nav-time">{nowTime}</h2>
      <div className="top-nav-sel-wrap">
        <div className="weather-icon">[Weather Icon]</div>
        <div>
          <p>{weather}</p>
          <p>{temperature}</p>
          <p>{airQuality}</p>
        </div>
      </div>
      <div className="top-nav-login-wrap">
        <FaUser
          style={{
            width: "3rem",
            height: "3rem",
            verticalAlign: "middle",
            cursor: "pointer",
          }}
          onClick={goToLogin}
        />
        <IoIosArrowDown
          style={{
            width: "1rem",
            height: "1rem",
            marginLeft: "1rem",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};
export default TopNavBar;
