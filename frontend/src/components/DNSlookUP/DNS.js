import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DNS = ({ openPorts, deviceip }) => {
  const [domainNames, setDomainNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate the API call after 3 minutes
        await new Promise((resolve) => setTimeout(resolve, 3 * 60 * 1000));
        
        const response = await axios.get(`http://localhost:3000/dnslookup?ip=${deviceip}`);
        setDomainNames(JSON.parse(response.data.domain_names));
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Simulated function to retrieve logo for a domain
  const getLogoUrl = (domain) => {
    // Replace this with actual logo retrieval logic
    // For now, we'll use placeholder images
    return `https://via.placeholder.com/50?text=${domain}`;
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Domain List</h1>
      <ul className="space-y-2">
        {domainNames.map((domain, index) => (
          <li key={index} className="flex items-center space-x-2">
            <img src={getLogoUrl(domain)} alt={`${domain} Logo`} className="w-8 h-8" />
            <span>{domain}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DNS;
