import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DNS = ({ openPorts, deviceip }) => {
  const [domainNames, setDomainNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3 * 60 * 1000));
      
      const response = await axios.get(`http://localhost:3000/dnslookup?ip=${deviceip}`);
      const parsedData = JSON.parse(response.data.domain_names);

      if (parsedData && parsedData.length > 0) {
        setDomainNames(parsedData);
        setLoading(false);
      } else {
        setError('No domain names found.');
        setLoading(false);
      }
      
      console.log(response);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceip]);

  const retryFetchData = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  const getLogoUrl = (domain) => {
    return `https://via.placeholder.com/50?text=${domain}`;
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Domain List</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <div className="text-red-600 text-center">
          <p>{error}</p>
          <button
            onClick={retryFetchData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Try Again
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {domainNames.map((domain, index) => (
            <li key={index} className="flex items-center space-x-2">
              <img src={getLogoUrl(domain)} alt={`${domain} Logo`} className="w-8 h-8" />
              <span>{domain}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DNS;
