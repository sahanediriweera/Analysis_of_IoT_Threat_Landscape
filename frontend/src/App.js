import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router';
import RadarDisplay from './components/RadarDisplay/RadarDisplay';
import DeviceList from './components/DeviceList/DeviceList';
import SearchBar from './components/SearchBar/SearchBar';
import SortingOptions from './components/SortingOptions/SortingOptions';
import Feed from './components/Feed/Feed';

// const App = () => {
//   // State to hold the list of connected IoT devices
//   const [deviceList, setDeviceList] = useState([]);

//   // State to indicate if network scan is in progress
//   const [scanning, setScanning] = useState(false);

//   // Function to start the network scan
//   const handleNetworkScan = () => {
//     // Simulate network scan process by fetching data from the backend (replace 'API_ENDPOINT/devices' with your actual API endpoint)
//     setScanning(true);
//     fetch('API_ENDPOINT/devices')
//       .then((response) => response.json())
//       .then((data) => {
//         setDeviceList(data);
//         setScanning(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching devices:', error);
//         setScanning(false);
//       });
//   };

//   const constantDevices = [
//     { id: 1, name: 'Device A', x: 60, y: 25 },
//     { id: 2, name: 'Device B', x: 70, y: 40 },
//     // Add more constant devices as needed
//   ];

//   return (
//     <div>
//       <Header />
//       <div style={{ textAlign: 'center', margin: '1rem' }}>
//         <button onClick={handleNetworkScan} disabled={scanning}>
//           {scanning ? 'Scanning...' : 'Start Network Scan'}
//         </button>
//       </div>
//       <RadarDisplay devices={constantDevices} />
//     </div>
//   );
// };

const App = () => {
  return (
    <div className="app bg-gray-100 min-h-screen">
      
      <div className="app bg-gray-100 min-h-screen flex flex-col">
        <Header />
        
        <div style={{ backgroundColor: 'rgb(0, 0, 22)' }} className="flex justify-center items-center h-screen">
          <Outlet />
        </div>
      </div>

    </div>
  );
};


export default App;
