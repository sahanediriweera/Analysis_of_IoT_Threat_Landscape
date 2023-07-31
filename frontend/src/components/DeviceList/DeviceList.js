import React from 'react';
import camara from '../../assets/cctv.png'
import Smartwatch from '../../assets/smartwatch.png'
import Bulb from '../../assets/smartbulb.png'
import Unknown from '../../assets/unknown.png'
import { Link } from 'react-router-dom';

// Define a mapping of device types to image paths
const deviceTypeIcons = {
  "Camera": camara,
  "Smartwatch": Smartwatch,
  "Smart Bulb": Bulb,
  // Add more device types and image paths as needed
};
// Default image path for unknown devices
const unknownDeviceIcon = Unknown;

const DeviceDetails = ({devices}) => {
  
      
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800 text-black aliment border-radius" style={{ borderRadius: '10px' }}>
      <h1 className="text-3xl font-bold mb-4 text-white text-center">Devices Details</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device, index) => (
          <Link key={index} to={`/devices/${index}`}> {/* Link to the DeviceDetailPage */}
          <div key={index} className="bg-white rounded-lg shadow p-4">
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
          </div>
          </Link>
        ))}
        
      </div>
    </div>
  );
};

export default DeviceDetails;
