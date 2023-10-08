import React from 'react';
import { useLocation } from 'react-router-dom';
import './RadarDisplay.css';
import CryptoJS from 'crypto-js'; // Import crypto-js library
import logo from '../../assets/router.png'

// Encryption key (Ideally, this should be stored securely on the server)
const encryptionKey = 'YourEncryptionKey';

// Function to encrypt data using AES
function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
}

// Function to decrypt data using AES
function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

function RadarDisplay() {
  // Get the deviceNames from the location state using useLocation hook
  const { state } = useLocation();
  const deviceNames = state && state.deviceNames ;
  const deviceIP = state && state.deviceIP;
  console.log(deviceNames);

  // Return early if deviceNames is undefined or null
  if (!deviceNames) {
    return null; // You can return some fallback JSX here if needed
  }

  // Assuming you have the getRandomCoordinate function defined somewhere else
  const xCoordinates = [100, 100, 250, 600, 450,500,600,330,350];
  const yCoordinates = [500, 300, 75, 400, 600,100,250,200,450];

  // Initialize current index for coordinates
  let currentCoordinateIndex = 0;

  // Modified getRandomCoordinate function to return coordinates one by one
  function getRandomCoordinate() {
    if (currentCoordinateIndex >= xCoordinates.length) {
      // Reset index when it exceeds the array length (you can modify this behavior if needed)
      currentCoordinateIndex = 0;
    }

    const x = xCoordinates[currentCoordinateIndex];
    const y = yCoordinates[currentCoordinateIndex];
    
    // Increment the index for the next call
    currentCoordinateIndex++;

    return { x, y };
  }

  // Create devicesData array containing all device names and random coordinates
  const devicesData = deviceNames.map((name, index) => {
    const encryptedName = encryptData(name); // Encrypt the name
    const encryptedIp = encryptData(name); // Encrypt the IP (For simplicity, I'm using the name as IP)
    return {
      id: index + 1,
      name: encryptedName, // Store the encrypted name
      ip: encryptedIp, // Store the encrypted IP
      ...getRandomCoordinate(),
    };
  });

  

  return (
    <div className="razar">
      <div className="ringbase ring1"></div>
      <div className="ringbase ring2"></div>
      <div className="pulse"></div>
      <div className="pointer">
        <div></div>
      </div>
      <div className="center-point" style={{ width: '150px', height: '150px' }}>
        <img src={logo} alt="Center Image" />
      </div>
      
      {/* Map over the devices to display the device icons */}
      {devicesData.map((device) => {
        const decryptedName = decryptData(device.name); // Decrypt the name
        return (
          
          
          <div key={device.ip} className="dot" style={{ left: `${device.x}px`, top: `${device.y}px` }}>
            <span className="device-name">{decryptedName}</span>
          </div>
        );
      })}
    </div>
  );
}

export default RadarDisplay;
