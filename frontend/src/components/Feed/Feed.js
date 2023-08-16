import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './Feed.css';
import ParticleAnimation from 'react-particle-animation';

function Feed() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [deviceNames, setDeviceNames] = useState([]);

  async function ClickHandle() {
    
    try {
      const response = await axios.get('http://localhost:3000/network_scan');
      console.log(response);
      
      try {
        const parsedData = JSON.parse(response.data);
        // Step 2: Extract all "Device Name" values
        const deviceNames = parsedData.map(item => item["Device Name"]);
        console.log(deviceNames);
        navigate('/radarDisplay', { state: { deviceNames } });
      } catch (jsonParseError) {
        console.error('Error occurred while parsing JSON data:', jsonParseError);
      }
    } catch (error) {
      console.error('Error occurred while making the API request:', error);
    }
  }
  

  return (
    <div className="p-40 flex justify-center items-center h-screen flex flex-col">
      <h1 className="text-5xl text-white font-custom">Welcome to our IoT Threat Analysis Web Application!</h1>
      <div className="p-10">
        <h6 className="text-2xl font-custom text-white custom-text-align">
          In today's interconnected world, the Internet of Things (IoT) has revolutionized the way we live,
          bringing unparalleled convenience and efficiency to our daily lives. From smart home devices to industrial automation,
          IoT has transformed various sectors. However, with this innovation comes a critical concern - the security of IoT devices.
        </h6>
      </div>
      <button onClick={ClickHandle} className="scan-btn bg-blue-500 text-white py-3 px-6 rounded-full hover:animate-pulse">
        SCAN NOW
      </button>
    </div>
  );
}

export default Feed;
