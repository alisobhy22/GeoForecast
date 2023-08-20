import React from 'react';
import { MyResponsiveChoropleth  } from './Map'

import data from './data.json'
function App() {

  




  return (
    <div className="m-50 w-screen outline h-screen flex justify-center items-center">
      <div className='w-2/3 h-screen'> <MyResponsiveChoropleth data={data} /></div>
      <div className='w-1/3'>hello</div>
    </div>
  );
}

export default App;
