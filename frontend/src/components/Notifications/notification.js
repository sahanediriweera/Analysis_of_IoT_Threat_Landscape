import React, { useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { BASE_URL } from '../../config';

const results = [false, false, false, false];
let attackNames = ["http","syn","udp","ICMP"]

function fetchDataAndLog(attackNameNumber) {

  const attackName = attackNames[attackNameNumber];

  axios.get(`${BASE_URL}${attacName}Notification`)
    .then((response) => {
      // Log the result to the console
      results[attackNameNumber] = true;
    })
    .catch((error) => {
    });
}

function notifications() {
  let count = 0;

 setInterval(() => {
      fetchDataAndLog(count%attackNames.length);
      count = count + 1;
    }, 600000);
      
};

function displayAllNotifications(){
  results.forEach( (result,key) => {
    if (result){
      NotificationManager.error(`${attackNames[key].toUpperCase()} attack Detected`,"Warning",5000);
    }
  } );
}

export {notifications,displayAllNotifications};
