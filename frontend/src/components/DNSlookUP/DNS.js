import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../src/config';
import { ThreeDots } from 'react-loader-spinner';

const DNS = ({ openPorts, deviceip }) => {
  const [domainNames, setDomainNames] = useState([]);
  const [logos, setLogos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Add a delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second

      const response = await axios.get(`${BASE_URL}dnslookup?ip=${deviceip}`);
      console.log('Raw response:', response); // Debug: Log the raw response

      const parsedData = JSON.parse(response.data);
      console.log('Parsed data:', parsedData); // Debug: Log the parsed data

      if (parsedData && parsedData.domain_names && parsedData.domain_names.length > 0) {
        setDomainNames(parsedData.domain_names);
        setLoading(false);
      } else {
        setError('No domain names found.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err.response) {
        console.error('Response Data:', err.response.data);
        console.error('Response Status:', err.response.status);
      }
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

  const getLogoUrl = async (domain) => {
    try {
      const clearbitResponse = await axios.get(`https://logo.clearbit.com/${domain}`);
      if (clearbitResponse.status === 200) {
        return clearbitResponse.config.url;
      } else {
        // Use a default logo URL if Clearbit doesn't have a logo for the domain
        return `https://via.placeholder.com/50?text=${domain}`;
      }
    } catch (error) {
      // Handle errors, and use a default logo URL
      return `https://via.placeholder.com/50?text=${domain}`;
    }
  };

  useEffect(() => {
    // Fetch logos for all domains
    const fetchLogos = async () => {
      const logoPromises = domainNames.map(async (domain) => ({
        domain,
        logoUrl: await getLogoUrl(domain),
      }));

      const logoData = await Promise.all(logoPromises);
      const logoMap = {};
      logoData.forEach((item) => {
        logoMap[item.domain] = item.logoUrl;
      });
      setLogos(logoMap);
    };

    if (!loading && !error) {
      fetchLogos();
    }
  }, [domainNames, loading, error]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Domain List</h1>
      {loading ? (
         
            <div className="flex justify-center  ">
              {/* Display a loading spinner */}
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
        
        
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
              {logos[domain] ? (
                <img src={logos[domain]} alt={`${domain} Logo`} className="w-8 h-8" />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span>{domain.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <span>{domain}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DNS;
