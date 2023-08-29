import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import RadarDisplay from './components/RadarDisplay/RadarDisplay';
import Feed from './components/Feed/Feed';
import DeviceDetails from './components/DeviceList/DeviceList';
import DeviceDetailPage from './components/DeviceIcon/DeviceDetailPage';
import Signup from './components/SignUp/SignUp';
import Login from './components/Logout/Logout';
import DNSLookUp from './components/DNSlookUP/DNS'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Feed />} />
        <Route path="radarDisplay" element={<RadarDisplay />} />
        <Route exact path="/dnslookup" element={<DNSLookUp/>} />
        <Route exact path="/deviceList" element={<DeviceDetails  />} />
        <Route path="/devices/:index" element={<DeviceDetailPage  />} />
        <Route path="/signup" element={<Signup /> }/>
        <Route path="/login" element={<Login /> }/>
      </Route>
      
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
