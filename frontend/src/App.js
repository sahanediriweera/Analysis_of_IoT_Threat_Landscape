import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import {Footer} from './components/Footer/Footer'; // Import the Footer component
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { notifications } from './components/Notifications/notification';
import { useEffect } from 'react';


const App = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    notifications();
  }, []);

  return (
    <div className="app bg-gray-100 min-h-screen h-full flex flex-col">
      <Header user={user} />
      <div style={{  }} className="flex-1 flex justify-center mt-220">
        <Outlet />
      </div>
      <div className='justify-center'>
        <Footer />
        
      </div>
      
    </div>
  );
};

export default App;