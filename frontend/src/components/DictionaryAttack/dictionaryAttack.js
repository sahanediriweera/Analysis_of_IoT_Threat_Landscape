import React from 'react'
import { BASE_URL } from '../../../src/config'; 

    const dictionaryAttack = async (e) => {
        e.preventDefault(); // Prevent form submission
        
        try {
          const response = await axios.get(`${BASE_URL}dictionary_attack?ip=${deviceip}&port=${port}`);
          const responseData = JSON.parse(response.data);
      
          console.log("Response Data:", responseData); // Log the responseData to see its structure
      
          if (Array.isArray(responseData)) {
            // If responseData is an array (as in your original example)
            const foundObjects = responseData.filter(obj => obj.Result === "Found");
            setFoundCredentials(foundObjects);
            // Extract and log Username and Password for each found object
            foundObjects.forEach(obj => {
              console.log(`Found object - Username: ${obj.Username}, Password: ${obj.Password}`);
            });
          } else if (typeof responseData === 'object') {
            // If responseData is an object with keys, assume the data is within the object
            const foundObjects = Object.values(responseData).filter(obj => obj.Result === "Found");
      
            // Extract and log Username and Password for each found object within the values
            foundObjects.forEach(obj => {
              console.log(`Found object - Username: ${obj.Username}, Password: ${obj.Password}`);
            });
          } else {
            console.log("Unexpected responseData format.");
          }
        } catch (error) {
          // Handle error
          console.error("An error occurred:", error);
        }
      };


  return (
    <div>dictionaryAttack</div>
  )


export default dictionaryAttack