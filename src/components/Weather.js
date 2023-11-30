import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Weather.css"

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Toronto');
  const [searchCity, setSearchCity] = useState('');
  const [error, SetError] = useState('');
  const apiKey = 'f48abe0ca5e0be50ab619a1c22aab971';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        setWeatherData(response.data);
        SetError(null);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        SetError('City does not exist');
      }
    };

    fetchData();
  }, [city]);

  const handleSearch = () => {
    setCity(searchCity);
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  return (

    <div className='container mt-5'>
      <div className='card'>
        <div className='card-body'>
          <h1 className='card-title mb-4'>Weather App</h1>

          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter city name'
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <button className='btn btn-primary mt-2' onClick={handleSearch}>
              Search
            </button>
          </div>

          {error && <p className='text-danger'>{error}</p>}

          {weatherData && (
        <div className='row'>
        <div className='col-md-6'>
            <div className='weatherinfo'>
              <h2 className='mb-4'>Weather in {weatherData.name}, {weatherData.sys.country}</h2>
              <p>Temperature: {weatherData.main.temp} K</p>
              <p>Feels like: {weatherData.main.feels_like} </p>
              <p>Visiblility: {weatherData.visibility} </p>
              <p>Wind: {weatherData.wind.speed} Km/h</p>
              <p>Deg: {weatherData.wind.deg} </p>
              <p>Gust: {weatherData.wind.gust} </p>
              <p>Air Pressure: {weatherData.main.pressure}mb</p>
              <p>Sunrise: {weatherData.sys.sunrise}</p>
            </div>
           </div>
           <div className='col-md-6'>
           <div className='weatherinfo'>
              <p>Sunset: {weatherData.sys.sunset}</p>
              <p>Longitude: {weatherData.coord.lon}</p>
              <p>Latitude: {weatherData.coord.lat}</p>
              <p>Max Temp: {kelvinToCelsius(weatherData.main.temp_max).toFixed(2)}°C</p>
              <p>Min Temp: {kelvinToCelsius(weatherData.main.temp_min).toFixed(2)}°C</p>
              <p>Weather Conditions: {weatherData.weather[0].description}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Timezone: {weatherData.timezone}</p>
              <p>Cod: {weatherData.cod}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt='Weather-icon'
                className='img-fluid'
              />
           </div>
           </div>
        </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
