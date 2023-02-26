import { useState } from 'react';
import { fetchWeather } from '../../api/fetchWeather';
import './App.css';

const App = () => {
  // Estado inicial de la aplicación
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const search = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await fetchWeather(query);
        console.log(data);
        setWeather(data);
        setQuery('');
        setError('');
      } catch (error) {
        handleFetchError();
      }
    }
  };

  const handleFetchError = () => {
    setWeather(null);
    setError('City not found, try another one please.');
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

      {weather && (
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
            <img
              className='city-icon'
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}

      {error && (
        <div className='city'>
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
