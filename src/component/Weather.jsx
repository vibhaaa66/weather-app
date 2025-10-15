import React from 'react'
import { useEffect, useState, useRef } from 'react';
import clear_icon from '../assets/clear.png'
import { IoSearch } from "react-icons/io5";
import { FiWind } from "react-icons/fi";
import { MdWaves } from "react-icons/md";



const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": "https://www.gstatic.com/weather/conditions2023/2023.2/svg/sunny_light.svg",
    "01n": "https://www.gstatic.com/weather/conditions2023/2023.2/svg/clear_night_light.svg",
    "02d": "http://openweathermap.org/img/wn/02d@2x.png",
    "02n": "http://openweathermap.org/img/wn/02n@2x.png",
    "03d": "http://openweathermap.org/img/wn/03d@2x.png",
    "03n": "http://openweathermap.org/img/wn/03n@2x.png",
    "04d": "http://openweathermap.org/img/wn/04d@2x.png",
    "04n": "http://openweathermap.org/img/wn/04n@2x.png",
    "09d": "http://openweathermap.org/img/wn/09d@2x.png",
    "09n": "http://openweathermap.org/img/wn/09n@2x.png",

  }

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok){
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || allIcons["01d"];
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        tempreture: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    }
    catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");``
    }
  }

  useEffect(() => {
    search("Delhi");

  }, [])


  return (
    <>
      <div className='weather flex flex-col items-center bg-cyan-900 m-10 mt-20 rounded-3xl p-5 place-self-center shadow-2xl shadow-cyan-400 opacity-70 mix-blend-multiply'>

        <div className="search-bar flex items-center gap-4 ">
          <input className='search-input h-[40px] border-none outline-none rounded-md pl-5 text-blue-950 bg-white text-2xl' ref={inputRef} type="text" placeholder='Search' />
          <button onClick={() => search(inputRef.current.value) } className='search-icon bg-white text-cyan-900 rounded-md text-2xl font-bold cursor-pointer hover:bg-cyan-800 hover:text-white p-2 m-1'><IoSearch /></button>
        </div>

        {weatherData ? <>

          <div className='weather-tem'>
            <img className='weather-icon w-20 mt-5' src={weatherData.icon} alt="" />
            <p className='tempreture text-white text-5xl font-semibold mt-3'>{weatherData.tempreture}°c</p>
            <p className='location text-white text-4xl mb-2'>{weatherData.location}</p>
          </div>

          <div className='wh-data flex gap-25 mt-10'>

            <div className='data1'>
              <button className='text-gray-400 text-3xl font-bold cursor-pointer p-2 m-1'><MdWaves /></button>
              <div className='text-white text-sm px-2'>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className='data2 '>
              <button className='text-gray-400 text-3xl font-bold cursor-pointer p-2 m-1'><FiWind /></button>
              <div className='text-white text-sm px-2'>
                <p>{weatherData.windSpeed}Km/h</p>
                <span>wind Speed</span>
              </div>
            </div>
          </div>

        </> : <></>}

      </div>

    </>
  )
}

export default Weather;