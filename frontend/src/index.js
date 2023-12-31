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
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const devices = [
  {
    "MACAddress": "00:1A:2B:3C:4D:5E",
    "DeviceID": "Device123",
    "DeviceTypeAndModel": "Camera", // Categorized as "Camera"
    "VendorInformation": "VendorXYZ",
    "SoftwareAndFirmwareVersion": "v1.0",
    // ... (other device properties)
  },
  {
    "MACAddress": "11:22:33:44:55:66",
    "DeviceID": "Device456",
    "DeviceTypeAndModel": "Smartwatch", // Categorized as "Smartwatch"
    "VendorInformation": "VendorABC",
    "SoftwareAndFirmwareVersion": "v2.0",
    // ... (other device properties)
  },
  {
    "MACAddress": "77:88:99:AA:BB:CC",
    "DeviceID": "Device789",
    "DeviceTypeAndModel": "Unknown device",
    // No DeviceTypeAndModel provided for this device (unknown device)
    "VendorInformation": "VendorPQR",
    "SoftwareAndFirmwareVersion": "v3.0",
    // ... (other device properties)
  },
  {
    "MACAddress": "77:88:99:AA:BB:CC",
    "DeviceID": "Device789",
    "DeviceTypeAndModel": "Unknown device",
    // No DeviceTypeAndModel provided for this device (unknown device)
    "VendorInformation": "VendorPQR",
    "SoftwareAndFirmwareVersion": "v3.0",
    // ... (other device properties)
  },
  {
    "MACAddress": "77:88:99:AA:BB:CC",
    "DeviceID": "Device789",
    "DeviceTypeAndModel": "Smart Bulb", // Categorized as "Smart Bulb"
    "VendorInformation": "VendorPQR",
    "SoftwareAndFirmwareVersion": "v3.0",
    // ... (other device properties)
  },
];

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
    <NotificationContainer/>
  </BrowserRouter>,
  document.getElementById('root')
);
