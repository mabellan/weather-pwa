import './App.css';
import {fetchWeather} from './api/fetchWeather';
import React, { useState } from 'react';

const App = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');
    const [error, setError] = useState('');

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query);
            if (data != null) {
                setWeather(data);
                setQuery('');
                setError(false);
            } else {
                setQuery('');
                setWeather(null);
                setError(true);
            }

        }
    };

    return (
        <div className='main-container'>
            <h1 className='title'>Weather App</h1>
          <input
              type='text'
              className='search'
              placeholder='Search a city...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
          />

            {weather?.main && (
                <div className='city'>
                    <h2 className='city-name'>
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className='city-temp'>
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>

                    <div className='info'>
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>
                            {weather.weather[0].description}
                        </p>
                    </div>

                </div>
            )}

            {error && (
                <div className='city'>
                    <h2>No city found, please try another one</h2>
                </div>
            )}
        </div>
    );
};

export default App;
