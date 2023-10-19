import React, { useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { BASE_URL } from '../../config';

function fetchDataAndLog(attacName) {



  axios.get(`${BASE_URL}${attacName}Notification`)
    .then((response) => {
      // Log the result to the console
      NotificationManager.error( `${attacName} Attack!`.toUpperCase(),'Error', 5000);
    })
    .catch((error) => {
      // Handle any errors
      NotificationManager.info(`${attacName}`.toUpperCase() , 'No Attacks', 5000);
    });
}

function notifications() {
  let count = 0;

  let attacNames = ["http","syn","udp","ICMP"]

 setInterval(() => {
      fetchDataAndLog(attacNames[count%attacNames.length]);
      count = count + 1;
    }, 10000);
      
};

export {notifications};
