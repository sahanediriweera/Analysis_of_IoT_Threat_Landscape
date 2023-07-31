// DeviceDetailPage.js
import React, { useState } from 'react';
import axios from 'axios'; // Install axios using npm or yarn

import { useParams } from 'react-router-dom';

import camara from '../../assets/cctv.png'
import Smartwatch from '../../assets/smartwatch.png'
import Bulb from '../../assets/smartbulb.png'
import Unknown from '../../assets/unknown.png'


// Define a mapping of device types to image paths
const deviceTypeIcons = {
  "Camera": camara,
  "Smartwatch": Smartwatch,
  "Smart Bulb": Bulb,
  // Add more device types and image paths as needed
};
// Default image path for unknown devices
const unknownDeviceIcon = Unknown;




const DeviceDetailPage = ({ devices }) => {
  const { index } = useParams();
  const device = devices[index];
  

  if (!device) {
    // Handle the case when the device is not found
    return <p>Device not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800 text-black aliment border-radius" style={{ borderRadius: '10px' }}>
      <h1 className="text-3xl font-bold mb-4 text-white text-center">Device Details</h1>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <img
          src={deviceTypeIcons[device.DeviceTypeAndModel] || unknownDeviceIcon}
          alt={device.DeviceTypeAndModel || "Unknown Device"}
          style={{ height: "100px", width: "100px", margin: "0 auto" }}
        />
        <h2 className="text-xl font-semibold mb-2">Device {index + 1}</h2>
        <p><span className="font-bold">MAC Address:</span> {device.MACAddress}</p>
        <p><span className="font-bold">Device ID:</span> {device.DeviceID}</p>
        {device.DeviceTypeAndModel && (
          <p><span className="font-bold">Device Type and Model:</span> {device.DeviceTypeAndModel}</p>
        )}
        <p><span className="font-bold">Vendor Information:</span> {device.VendorInformation}</p>
        <p><span className="font-bold">Software and Firmware Version:</span> {device.SoftwareAndFirmwareVersion}</p>
        {/* Add more device properties as needed */}

        <div className="p-4 bg-gray-100 rounded-lg  ">
          <h2 className="text-2xl font-bold mb-4">Open Ports</h2>
          
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Scan Ports
          </button>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Dictionary Attack</h2>
          
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Scan Ports
          </button>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Check the Test Encryption</h2>
          
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Scan Ports
          </button>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">DDos</h2>
          
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Scan Ports
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default DeviceDetailPage;
