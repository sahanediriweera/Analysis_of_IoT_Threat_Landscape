import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="app bg-gray-100 min-h-screen h-full">
      <div className="app bg-gray-100 min-h-screen flex flex-col">
        <Header user={user} />
        <div style={{ backgroundColor: 'rgb(0, 0, 22)' }} className="  flex justify-center  h-screen mt-220">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
