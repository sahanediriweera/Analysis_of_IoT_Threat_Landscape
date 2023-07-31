import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import './index.css';
import App from './App';
import RadarDisplay from './components/RadarDisplay/RadarDisplay';
import Feed from './components/Feed/Feed';
import DeviceDetails from './components/DeviceList/DeviceList';
import DeviceDetailPage from './components/DeviceIcon/DeviceDetailPage';

const NotFound = () => {
    return (
      <p>404</p>
    )
}

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
      <Route exact path="/" element={<App />} >
      
        <Route index element={<Feed />} />
        <Route path="radarDisplay" element={<RadarDisplay />} />
        {/* <Route path="deviceDetails" element={<DeviceDetails />} /> */}
        <Route exact path="/deviceDetails" element={<DeviceDetails devices={devices} />} /> {/* Corrected component and devices prop */}
        <Route path="/devices/:index" element={<DeviceDetailPage devices={devices} />} /> {/* Corrected component and devices prop */}
        
        
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
