import React,{ useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './RadarDisplay.css';
import CryptoJS from 'crypto-js'; // Import crypto-js library
import logo from '../../assets/router.png'
import Bulb from '../../assets/smartbulb.png';
import camara from '../../assets/cctv.png';
import Smartwatch from '../../assets/smartwatch.png';
import raspberry from '../../assets/raspberry.png'
import phone from '../../assets/phone.jpg';
import lap from '../../assets/lap.jpg' ;
import smartSwitch from '../../assets/switch.jpg';

import { Link } from 'react-router-dom';

import { ThreeDots } from 'react-loader-spinner';

import Unknown from '../../assets/unknown.png';


const deviceTypeIcons = {
  "192.168.2.1":raspberry,
  "192.168.2.7": phone,
  "192.168.2.91": lap,
  "192.168.2.99" : phone,
  "192.168.2.30" : lap,
  "192.168.2.33" : lap,
  "192.168.2.40" : Bulb,
  "192.168.2.43" : smartSwitch,
  "192.168.2.88" : lap,
  "192.168.2.16 ": lap,
  "192.168.2.17" : lap
  
};

const unknownDeviceIcon = Unknown;

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
  
  console.log(deviceNames);

  const [showImages, setShowImages] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // After a certain time (e.g., 3 seconds), switch to displaying images
    const timeout = setTimeout(() => {
      setShowImages(true);
    }, 10000); // Adjust the time in milliseconds as needed

    return () => clearTimeout(timeout); // Clean up the timeout on component unmount
  }, []);



  // Return early if deviceNames is undefined or null
  if (!deviceNames) {
    return null; // You can return some fallback JSX here if needed
  }

  // Assuming you have the getRandomCoordinate function defined somewhere else
  const xCoordinates = [100, 100, 175, 600, 450,500,600,330,250];
  const yCoordinates = [500, 300, 150, 400, 550,100,250,50,575];

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
    
    <div class="flex flex-col items-center">
      <div class="flex-1 p-4 iteam-center text-4xl font-bold mt-4">NetWork Scan</div>
      <div class="flex-1 p-4 ">
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
          {devicesData.map((device, index) => {
            const decryptedName = decryptData(device.name); // Decrypt the name
            return (
              
              <React.Fragment key={device.ip}>
                {showImages ? (
                  
                  <img className="img"
                    src={deviceTypeIcons[decryptedName] || unknownDeviceIcon} // Use the appropriate device image here based on device type
                    alt={decryptedName}
                    style={{ position: 'absolute', left: `${device.x}px`, top: `${device.y}px`, height:"75px", width:"75px" }}
                  />
                ) : (
                  <Link key={index} to={`/devices/${index}`}>
                  <div className="dot" style={{ left: `${device.x}px`, top: `${device.y}px` }}>
                    <span className="device-name">{decryptedName}</span>
                  </div>
                  </Link>
                  
                )}
              </React.Fragment>
            );
      })}
    </div>
  </div>
</div>

    
    
  );
}

export default RadarDisplay;
