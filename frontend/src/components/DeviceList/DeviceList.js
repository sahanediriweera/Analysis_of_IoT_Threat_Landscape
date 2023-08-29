import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import camara from '../../assets/cctv.png';
import Smartwatch from '../../assets/smartwatch.png';
import Bulb from '../../assets/smartbulb.png';
import Unknown from '../../assets/unknown.png';

import { ThreeDots } from 'react-loader-spinner';

const deviceTypeIcons = {
  "Camera": camara,
  "Smartwatch": Smartwatch,
  "Smart Bulb": Bulb,
};

const unknownDeviceIcon = Unknown;

const DeviceDetails = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/device_scan');

        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = JSON.parse(response.data); // Parse the JSON data

        if (!Array.isArray(data)) {
          throw new Error("Fetched data is not an array.");
        }

        setDevices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Display a loading spinner */}
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8  text-black align-middle border-radius style={{ borderRadius: '10px', marginTop: '1
    50px' } " style={{ borderRadius: '10px' }}>
      <h1 className="text-3xl font-bold mb-4 text-white text-center">Devices Details</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device, index) => (
          <Link key={index} to={`/devices/${index}`}>
            <div className="bg-white rounded-lg shadow p-4" key={index}>
              <img
                src={deviceTypeIcons[device.DeviceTypeAndModel] || unknownDeviceIcon}
                alt={device.DeviceTypeAndModel || "Unknown Device"}
                style={{ height: "100px", width: "100px", margin: "0 auto" }}
              />
              <h2 className="text-xl font-semibold mb-2">Device {index + 1}</h2>
              <p><span className="font-bold">MAC Address:</span> {device.MACAddress}</p>
              <p><span className="font-bold">Device ID:</span> {device.DeviceID}</p>
              <p><span className="font-bold">IP Address:</span> {device.IPAddress}</p>
              <p><span className="font-bold">Vendor Information:</span> {device.VendorInformation}</p>
              {/* Add more device properties as needed */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DeviceDetails;
