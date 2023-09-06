import React, { useState, useEffect } from 'react';
import { MyResponsiveChoropleth } from './Map'
import {SpinningCircles} from 'react-loading-icons'
import data from './data.json';
import Info from './Info';
function App() {
  const API_KEY = '65947b5ecafad715b8130331f59b02dd';
  const [country, setCountry] = useState(null);
  const [countryID, setCountryID] = useState('none');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [countryData, setCountryData] = useState(data);
  useEffect(() => {
    const fetchWeather = async () => {
      if(country === null) return;
      setWeather(null);
      setError(null); // Reset error state
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`);
        if (!response.ok) {
          throw new Error('Weather data not found'); // Throw an error for non-successful responses
        }
        const data = await response.json();
        setWeather(data);
  
        // Move mapping logic here, after successfully fetching the weather data
        setCountryData((prev) => {
          return prev.map((d) => {
            if (d.id === countryID) {
              const temperatureCelsius = toCelsius(data.main.temp).toFixed(2);
              if (temperatureCelsius > 50) {
                return {
                  ...d,
                  value: 0, // Set super hot countries to 0
                };
              } else if (temperatureCelsius < 0) {
                return {
                  ...d,
                  value: 50, // Set super cold countries to 50
                };
              } else {
                // Map the temperature to the range 0-50, but reverse it
                const mappedValue = 50 - ((temperatureCelsius / 50) * 50);
                return {
                  ...d,
                  value: mappedValue,
                };
              }
            } else {
              return d;
            }
          });
        });
      } catch (error) {
        setError('Weather data not found'); // Set the error message
      }
    };
    fetchWeather();
  }, [country]);
  


  const toCelsius = (temp) => {
    return temp - 273.15;
  }

  return (
    <div className="w-screen h-auto p-16 justify-center items-center bg-gray-900 text-white dark:bg-gray-800">
      <div className='flex justify-center items-center'>
        <h1 className="text-4xl font-bold text-center mb-8">Weather App</h1>
      </div>
      <div className="w-full h-full bg-gray-700 rounded-lg p-12 shadow-lg flex flex-col justify-center items-center">
        <div className="border border-blue-500 h-[1200px] w-[1600px] p-4 rounded-lg shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500 via-red-600 to-blue-500 opacity-60"></div>
          <MyResponsiveChoropleth data={countryData} setCountry={setCountry} setCountryID={setCountryID}/>
        </div>
        


        {weather === null && country === null ? null : (
  weather !== null ? (
    <Info weather={toCelsius(weather.main.temp)} country={country} />
  ) : (
    <h1>Loading...</h1>
  )
)}




      </div>
    </div>
  );
}

export default App;
