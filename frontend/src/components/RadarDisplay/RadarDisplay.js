import React from 'react';
import './RadarDisplay.css'; // Import the CSS file for the RadarDisplay component

const RadarDisplay = () => {
  const devicesData = [
    { id: 1, name: 'Camara', x: 600, y: 250 },
    { id: 2, name: 'Switch', x: 70, y: 400 },
    { id: 3, name: 'Device C', x: 250, y: 550 },
    { id: 4, name: 'Device D', x: 300, y: 100 },
    // Add more devices as needed
  ];

  return (
    <div className="razar">
      <div className="ringbase ring1"></div>
      <div className="ringbase ring2"></div>
      <div className="pulse"></div>
      <div className="pointer">
        <div></div>
      </div>
      {/* Map over the devices to display the device icons */}
      {devicesData.map((device) => (
        <div key={device.id} className="dot" style={{ left: `${device.x}px`, top: `${device.y}px` }}>
          <span className="device-name">{device.name}</span>
        </div>
      ))}
    </div>
  );
};

export default RadarDisplay;
