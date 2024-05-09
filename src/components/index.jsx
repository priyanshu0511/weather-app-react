import React, { useState } from 'react'
import { FaSearch, FaWind } from 'react-icons/fa'
import clear from './assests/clear.png'
import fourofour from './assests/404.png'
import cloud from './assests/cloud.png'
import mist from './assests/mist.png'
import rain from './assests/rain.png'
import snow from './assests/snow.png'
import { FaDroplet } from 'react-icons/fa6'
import './style.css'


function Weather() {

  const api_key = process.env.REACT_APP_WEATHERAPI;
  const [temperature, setTemperature] = useState('');
  const [tempData, setTempData] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windspeed, setWindspeed] = useState('');
  const [image, setImage] = useState('');
  const [display, setDisplay] = useState('none');
  const [lnf, setLnf] = useState('none');


  async function search(e) {

    e.preventDefault();
    const city = e.target[0].value;
    if (city === '') {
      alert("Please enter a city");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const data = await fetch(`${url}`)
      .then(response => response.json());

    if (data.cod === '404') {
      setLnf('block');
      setDisplay('none');
    }
    else {
      const temp = Math.round(data.main.temp - 273);
      setTemperature(temp);
      setTempData(data.weather[0].main);
      setHumidity(data.main.humidity);
      setWindspeed(data.wind.speed);
      switch (data.weather[0].main) {
        case 'Clouds':
          setImage(cloud);
          break;
        case 'Clear':
          setImage(clear);
          break;
        case 'Rain':
          setImage(rain);
          break;
        case 'Mist':
          setImage(mist);
          break;
        case 'Snow':
          setImage(snow);
          break;
        case 'Haze':
          setImage(mist);
          break;
        default:
          setImage(fourofour);
      }
      setLnf('none');
      setDisplay('block');
    }
  }

  return (
    <div className='container'>
      <form onSubmit={search}>
        <input type="text" placeholder='Enter your location' />
        <button className='search-btn'><FaSearch /></button>
      </form>
      <div className="location-not-found" style={{ display: lnf }}>
        <h1>Sorry!! Location not found!</h1>
        <img src={fourofour} alt="Location Not Found" />
      </div>
      <div className="info" style={{ display: display }}>
        <div className="information">
          <img src={image} alt="Weather" />
          <div className="temperature">{temperature}°C</div>
          <div className="temp-info">{tempData}</div>
        </div>
        <div className="extra-info">
          <div className="humidity">
            <div className="humid-icon">
              <FaDroplet />
            </div>
            <div className="humid">
              <span>{humidity}%</span>
              <span>Humidity</span>
            </div>
          </div>
          <div className="wind-speed">
            <div className="wind-icon">
              <FaWind />
            </div>
            <div className="wind">
              <span>{windspeed}km/h</span>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather