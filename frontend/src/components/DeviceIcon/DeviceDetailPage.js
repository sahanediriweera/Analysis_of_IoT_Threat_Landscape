
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Install axios using npm or yarn
import { useParams } from 'react-router-dom';
import camara from '../../assets/cctv.png'
import Smartwatch from '../../assets/smartwatch.png'
import Bulb from '../../assets/smartbulb.png'
import Unknown from '../../assets/unknown.png'
import TestEncryption from '../TestEncrption/TestEncrption';
import DDocAttack from '../DOoS_Attack/DDocAttack';
import DNS from '../DNSlookUP/DNS'


// Define a mapping of device types to image paths
const deviceTypeIcons = {
  "Camera": camara,
  "Smartwatch": Smartwatch,
  "Smart Bulb": Bulb,
  // Add more device types and image paths as needed
};
// Default image path for unknown devices
const unknownDeviceIcon = Unknown;

const DeviceDetailPage = () => {
  const { index } = useParams();

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("openPorts");
  const [foundCredentials, setFoundCredentials] = useState([]);
  const [IPAddresses, setIPAddresses] = useState([]);
  const [PortArrays, setPortArrays] = useState([]);
  const [openPorts, setOpenPorts] = useState([]);
  const [scanning, setScanning] = useState(false);
  
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/device_scan');

        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = JSON.parse(response.data); // Data is already parsed with axios

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
    return <div>Loading...</div>;
  }
  const device = devices[index];
  const deviceip = device.IPAddress;

  if (!device) {
    return <p>Device not found</p>;
  }

  const scanPorts = async () => {
    try {
      setScanning(true);
      const response = await axios.get(`http://localhost:3000/port_scan?ip=${deviceip}`);
      const responseData = JSON.parse(response.data);
      const openPortArray = responseData[deviceip] || [];
      setOpenPorts(openPortArray);
      setScanning(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setScanning(false);
      setError(error);
      
    }
  };

 

const dictionaryAttack = async (e) => {
  e.preventDefault(); // Prevent form submission
  
  try {
    const response = await axios.get(`http://localhost:3000/dictionary_attack?ip=${ip}&port=${port}`);
    const responseData = JSON.parse(response.data);

    console.log("Response Data:", responseData); // Log the responseData to see its structure

    if (Array.isArray(responseData)) {
      // If responseData is an array (as in your original example)
      const foundObjects = responseData.filter(obj => obj.Result === "Found");
      setFoundCredentials(foundObjects);
      // Extract and log Username and Password for each found object
      foundObjects.forEach(obj => {
        console.log(`Found object - Username: ${obj.Username}, Password: ${obj.Password}`);
      });
    } else if (typeof responseData === 'object') {
      // If responseData is an object with keys, assume the data is within the object
      const foundObjects = Object.values(responseData).filter(obj => obj.Result === "Found");

      // Extract and log Username and Password for each found object within the values
      foundObjects.forEach(obj => {
        console.log(`Found object - Username: ${obj.Username}, Password: ${obj.Password}`);
      });
    } else {
      console.log("Unexpected responseData format.");
    }
  } catch (error) {
    // Handle error
    console.error("An error occurred:", error);
  }
};

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    if (activeTab === "openPorts") {
      return (
        <div>
          <div className="p-4 text-center ">

          <div className="mt-8 text-left">
              {/* Add error message and try again button here */}
              {errordispay()}
              {/* The rest of your tab content */}
          </div>

            <h1 className="text-3xl font-bold mb-4">Open Ports</h1>
            <button
              className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                scanning ? 'cursor-not-allowed opacity-70' : 'hover:bg-blue-700'
              }`}
              onClick={scanPorts}
              disabled={scanning}
            >
              {scanning ? 'Scanning...' : 'Scan Ports'}
            </button>
            <ul className="mt-4 space-y-2">
              {openPorts.map((port, index) => (
                <li
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-md text-gray-800"
                >
                  Port: {port}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else if (activeTab === "dictionaryAttack") {
      return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Select IP address and Port to attack</h2>
        <form onSubmit={dictionaryAttack}>
          <div className="mb-4">
            <label htmlFor="ip" className="block text-sm font-medium text-gray-600 text-left">IP Address</label>
            <input
              type="text"
              id="ip"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="port" className="block text-sm font-medium text-gray-600 text-left">Port</label>
            <input
              type="number"
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md text-center"
          >
            Attack
          </button>
        </form>

        {foundCredentials.length > 0 && (
        <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Found Credentials</h3>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Password</th>
            </tr>
          </thead>
          <tbody>
            {foundCredentials.map((credential, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="px-4 py-2">{credential.Username}</td>
                <td className="px-4 py-2">{credential.Password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      </div>
      );
    } else if (activeTab === "ddos") {
      return (
        <div>
          <DDocAttack openPorts={openPorts} deviceip={deviceip} />
        </div>
      );
    } else if (activeTab === "testEncryption") {
      return (
        <div>
          <TestEncryption openPorts={openPorts} deviceip={deviceip} />
        </div>
      );
    }else if (activeTab === "DNSLookUp") {
      return (
        <div>
          <DNS openPorts={openPorts} deviceip={deviceip} />
        </div>
      );
    }

  };

  const errordispay = () => {
    if (error) {
      return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 backdrop-blur-lg">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800">Error: {error.message}</p>
            <button
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setError(null)}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container  mx-auto px-4 py-8  text-black rounded-lg">
      <div className="flex">
        <div className="w-1/4 pr-8">
          <h1 className="text-3xl font-bold mb-4 text-white text-center">Device Details</h1>
          <div className="bg-white rounded-lg shadow p-4 text-center">
              <img
                src={deviceTypeIcons[device.DeviceTypeAndModel] || unknownDeviceIcon}
                alt={device.DeviceTypeAndModel || "Unknown Device"}
                className="h-24 w-24 mx-auto mb-2"
              />
              <h2 className="text-xl font-semibold mb-2">Device {device.DeviceID}</h2>
              <p><span className="font-bold">MAC Address:</span> {device.MACAddress}</p>
              <p><span className="font-bold">IP Address:</span> {device.IPAddress}</p>
              
              {device.DeviceTypeAndModel && (
                <p><span className="font-bold">IP Address:</span> {device.IPAddress}</p>
              )}
              <p><span className="font-bold">Vendor Information:</span> {device.VendorInformation}</p>
          </div>
        </div>
        <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-4  text-white text-left">Actions</h1>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="mb-4">
              
              <div className="flex space-y-1">
                  <button
                    className={`w-1/4 m-1 px-4 py-2 rounded-md ${
                      activeTab === "openPorts" ? "bg-blue-600 text-white" : "bg-gray-200"
                    } hover:bg-blue-600 hover:text-white focus:outline-none`}
                    onClick={() => handleTabClick("openPorts")}
                  >
                    Open Ports
                  </button>
                  <button
                    className={`w-1/4 m-1 px-4 py-2 rounded-md ${
                      activeTab === "dictionaryAttack" ? "bg-blue-600 text-white" : "bg-gray-200"
                    } hover:bg-blue-600 hover:text-white focus:outline-none`}
                    onClick={() => handleTabClick("dictionaryAttack")}
                    
                  >
                    Dictionary Attack
                  </button>
                  <button
                    className={`w-1/4 m-1 px-4 py-2 rounded-md ${
                      activeTab === "ddos" ? "bg-blue-600 text-white" : "bg-gray-200"
                    } hover:bg-blue-600 hover:text-white focus:outline-none`}
                    onClick={() => handleTabClick("ddos")}
                  >
                    DDos
                  </button>
                  <button
                    className={`w-1/4 m-1 px-4 py-2 rounded-md ${
                      activeTab === "testEncryption" ? "bg-blue-600 text-white" : "bg-gray-200"
                    } hover:bg-blue-600 hover:text-white focus:outline-none`}
                    onClick={() => handleTabClick("testEncryption")}
                  >
                    Check the Test Encryption
                  </button>
                  <button
                    className={`w-1/4 m-1 px-4 py-2 rounded-md ${
                      activeTab === "testEncryption" ? "bg-blue-600 text-white" : "bg-gray-200"
                    } hover:bg-blue-600 hover:text-white focus:outline-none`}
                    onClick={() => handleTabClick("DNSLookUp")}
                  >
                    DNSLookUp
                  </button>
                </div>

                <div className="mt-8 text-left" >
                  {renderContent()}
                </div>

            </div>
          </div>
        </div>
      </div>
      
    </div>


  );
};

export default DeviceDetailPage;
