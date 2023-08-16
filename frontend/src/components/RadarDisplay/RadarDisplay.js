import React from 'react';
import { useLocation } from 'react-router-dom';
import './RadarDisplay.css';
import CryptoJS from 'crypto-js'; // Import crypto-js library

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
  const deviceNames = state && state.deviceNames;
  console.log(deviceNames);

  // Return early if deviceNames is undefined or null
  if (!deviceNames) {
    return null; // You can return some fallback JSX here if needed
  }

  // Assuming you have the getRandomCoordinate function defined somewhere else
  function getRandomCoordinate() {
    const maxX = 600;
    const maxY = 600;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    console.log(x);
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
