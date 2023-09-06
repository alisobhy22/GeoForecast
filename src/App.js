import React, {useState, useEffect} from 'react';
import { MyResponsiveChoropleth } from './Map'

import data from './data.json';

function App() {
const API_KEY = '65947b5ecafad715b8130331f59b02dd';
const [country, setCountry] = useState('none');
useEffect(() => {
  const fetchWeather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
  }
  fetchWeather();
}, [country])


  return (
    <div className="w-screen h-auto p-16 justify-center items-center bg-gray-900 text-white dark:bg-gray-800">
      <div className='flex justify-center items-center'>
        <h1 className="text-4xl font-bold text-center mb-8">Weather App</h1>
      </div>
      <div className="w-full h-full bg-gray-700 rounded-lg p-12 shadow-lg flex flex-col justify-center items-center">
        <div className="border border-blue-500 h-[1200px] w-[1600px] p-4 rounded-lg shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500 via-red-600 to-blue-500 opacity-60"></div>
          <MyResponsiveChoropleth data={data} setCountry={setCountry}/>
        </div>
        <div>{country}</div>
      </div>
    </div>
  );
}

export default App;
