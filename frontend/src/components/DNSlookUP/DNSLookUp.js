import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DnsLookupComponent = () => {
  const [loading, setLoading] = useState(true);
  const [domainNames, setDomainNames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/dnslookup/${}')
      .then(response => {
        setDomainNames(JSON.parse(response.data.domain_names));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const fetchLogo = async (domainName) => {
    try {
      const response = await axios.get(`https://logo.clearbit.com/${domainName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching logo:', error);
      return null;
    }
  };

  return (
    <div className="flex justify-center  h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Domain Names and Logos</h2>
          <ul>
            {domainNames.map(async (domainName, index) => {
              const logoUrl = await fetchLogo(domainName);
              return (
                <li key={index} className="flex items-center space-x-4 my-2">
                  {logoUrl && <img src={logoUrl} alt={`${domainName} Logo`} className="w-8 h-8" />}
                  <span>{domainName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DnsLookupComponent;