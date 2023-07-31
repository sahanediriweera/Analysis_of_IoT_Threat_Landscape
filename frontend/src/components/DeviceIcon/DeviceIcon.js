import React from 'react';

const DeviceIcon = ({ device }) => {
  const { name, x, y } = device; // Assuming x and y are coordinates for device placement on the radar

  return (
    <div style={iconStyle(x, y)}>
      {/* Display the device icon or any other representation */}
      <div>{name}</div>
    </div>
  );
};

const iconStyle = (x, y) => ({
  position: 'absolute',
  left: `${x}%`,
  top: `${y}%`,
  transform: 'translate(-50%, -50%)', // Center the icon based on its position
  width: '30px',
  height: '30px',
  background: '#007bff',
  color: '#fff',
  borderRadius: '50%',
  textAlign: 'center',
  lineHeight: '30px',
});

export default DeviceIcon;
