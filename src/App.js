import React from 'react';
import { MyResponsiveChoropleth } from './Map'

import data from './data.json';

function App() {
  return (
    <div className="w-screen h-screen p-16 flex justify-center items-center bg-gray-900 text-white dark:bg-gray-800">
      <div className="w-full h-full bg-gray-700 rounded-lg p-8 shadow-lg flex justify-center items-center">
        <div className="border border-gray-800 h-full w-[1600px] p-4 rounded-lg shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500 via-red-600 to-blue-500 opacity-60"></div>
          <MyResponsiveChoropleth data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
