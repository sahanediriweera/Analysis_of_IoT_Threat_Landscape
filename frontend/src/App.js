import React from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router';
import particlesDisplay from './components/ParticlesDisplay/particlesDisplay';


const App = () => {
  return (
    <div className="app bg-gray-100 min-h-screen h-full">
      
      <div className="app bg-gray-100 min-h-screen flex flex-col">
        <Header />
        
        
        <div style={{ backgroundColor: 'rgb(0, 0, 22)' }} className="flex justify-center items-center h-screen ">
          <particlesDisplay/>
          <Outlet />
        </div>
      </div>

    </div>
  );
};


export default App;
