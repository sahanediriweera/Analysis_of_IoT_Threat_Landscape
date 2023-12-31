import React, { useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import {notifications} from './notification.js';
import { BASE_URL } from '../../../src/config'; 

function restartNotifications() {

 setInterval(() => {
        NotificationManager.warning('Intruder Detection System Inactive.\nRestart Application' , 'Warning', 5000);
    }, 10000);
      
};


function initializeAttackScanner(attacName) {

    axios.get(`${BASE_URL}initialize_attack_detection`)
      .then((response) => {  
        NotificationManager.success( 'Intruder Detection System Activated','Success', 5000);
        notifications();
      })
      .catch((error) => {
        restartNotifications();
      });
  }

export {initializeAttackScanner};