import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../src/config'; 

const AttackComponent = ({ openPorts, deviceip }) => {
  const [port, setPort] = useState('');
  const [attackType, setAttackType] = useState('httpAttack');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAttackClick = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}${attackType}`, {
        params: {
          ipAddress: deviceip, // Use the deviceip prop
          port,
        },
      });

      setResponseData(response.data);
    } catch (error) {
      console.error('Error performing attack:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label htmlFor="port" className="block mb-1">Port:</label>
        <select
          id="port"
          className="border p-2 w-full"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        >
          <option value="" disabled>Select a port</option>
          {openPorts.map((portNumber, index) => (
            <option key={index} value={portNumber}>
              {portNumber}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Attack Listener Type:</label>
        <select
          className="border p-2 w-full"
          value={attackType}
          onChange={(e) => setAttackType(e.target.value)}
        >
          <option value="httpAttack">HTTP Attack Listener</option>
          <option value="icmp">ICMP Attack Listener</option>
          <option value="syn">SYN Attack Listener</option>
          <option value="udp">UDP Attack Listener</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleAttackClick}
        disabled={loading}
      >
        {loading ? 'lisining...' : 'listen'}
      </button>
      {responseData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Attack Response Data:</h2>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AttackComponent;
