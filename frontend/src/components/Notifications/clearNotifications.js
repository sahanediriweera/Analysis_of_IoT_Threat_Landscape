import { NotificationManager } from 'react-notifications';
import axios from 'axios';

const clearNotifcaitons = () => { 

    axios.get(`http://localhost:3000/clearNotifications`)
    .then((response) => {
    // Log the result to the console
    NotificationManager.sucess("Notifications cleared successfully","Success",5000);
    })
    .catch((error) => {
    notifications.error("Notifcation clearing failed","Error",5000);
    });
}


export {clearNotifcaitons};