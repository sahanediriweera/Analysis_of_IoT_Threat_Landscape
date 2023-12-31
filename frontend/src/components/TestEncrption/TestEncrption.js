import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../src/config'; 
import io from 'socket.io-client';

const socket = io('http://192.168.2.40:55443');

const TestEncryption = ({ openPorts, deviceip }) => {
  
  const [port, setPort] = useState('');
  const [data, setData] = useState(null);

  const handleListen = () => {
    axios.get(`${BASE_URL}listen_last?ip=${deviceip}&port=${port}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessage(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Encryption</h1>
      
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
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleListen}
      >
        Listen
      </button>
      {data && (
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Response Data:</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestEncryption;
