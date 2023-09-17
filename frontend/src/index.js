import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import RadarDisplay from './components/RadarDisplay/RadarDisplay';
import Feed from './components/testFeed/testFeed';
import DeviceDetails from './components/DeviceList/DeviceList';
import DeviceDetailPage from './components/DeviceIcon/DeviceDetailPage';
import Signup from './components/SignUp/SignUp';
import Login from './components/Logout/Logout';
import DNSLookUp from './components/DNSlookUP/DNS'
import Contact from './components/ContactUs/contactUs';
import Contribute from './components/Contribute/Contribute'

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
        
        {/* <Route path="/aboutUs" component={AboutUs} />
        <Route path="/license" component={License} />
        <Route path="/contribute" component={Contribute} /> */}
        <Route path="/contactUs" element={<Contact /> } />
        <Route path="/Contribute" element={<Contribute/> } />

      </Route>
      
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
