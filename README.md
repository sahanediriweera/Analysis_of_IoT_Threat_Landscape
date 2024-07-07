
# Analysis of the IoT Threat Landscape

This project is an advanced IoT device identification and vulnerability analysis system. It utilizes machine learning to identify IoT devices and gather network information using tools such as nmap. The system is designed to run on Kali Linux and can perform various attacks on IoT devices to identify vulnerabilities, including DDoS, dictionary attacks, HTTP, and ICMP testing for data encryption. The system features a React frontend and a Node.js backend.

## Functionality

The IoT Device Identification and Vulnerability Analysis System provides the following functionality:

- **IoT Device Identification**: Uses machine learning models to identify IoT devices on the network.
- **Network Information Gathering**: Utilizes tools like nmap to scan the network and gather information about connected devices.
- **Vulnerability Analysis**: Performs various attacks on IoT devices to identify potential vulnerabilities, including DDoS, dictionary attacks, HTTP, and ICMP testing.
- **Attack Detection and Notification**: Detects ongoing attacks and generates alerts for different types of attacks.

## Technologies Used

- **Machine Learning**: Utilized for IoT device identification and anomaly detection.
- **Network Scanning Tools**: nmap and other tools are used for network information gathering.
- **Backend**: Node.js and Express.js for handling API requests and managing the server.
- **Frontend**: React for building the user interface.
- **Kali Linux**: Platform for running the system and performing security tests.
- **Programming Languages**: JavaScript, Python

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend

The frontend is built using React and can be accessed using the following commands:

```bash
cd frontend
npm start
```

### Backend

The backend is built using Node.js and Express.js. It provides various endpoints for network scanning, vulnerability analysis, and machine learning tasks. The backend can be started using the following commands:

```bash
cd backend
cd nodebackend
node server
```

## Backend Code Example

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

app.use(logger);

// Cross-Origin Resource Sharing
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:4000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/root'));

app.use('/network_scan', require('./routes/networkScan')); // Returns IP address array
app.use('/port_scan', require('./routes/portScan')); // Returns open ports list
app.use('/test_encryption', require('./routes/test_encryption')); // Takes port and IP, returns a test description
app.use('/device_scan', require('./routes/deviceScan'));

app.use('/dictionary_attack', require('./routes/dictionaryAttack')); // Takes port and IP, returns results JSON
app.use('/ddos', require('./routes/ddos')); // Takes port and IP, "ddos activated", opens a new file to a new terminal
app.use('/httpAttack', require('./routes/httpAttack'));
app.use('/icmp', require('./routes/icmp')); // Only IP
app.use('/syn', require('./routes/syn')); // IP and port
app.use('/udp', require('./routes/udp')); // IP and port

app.use('/dnslookup', require('./routes/dnslookup')); // Only IP

app.use('/listen_last', require('./routes/listenLast')); // IP and port

// Machine Learning Part
app.use('/packet_capturing', require('./routes/packet_capturing'));
app.use('/pcap2csv', require('./routes/pcap2csv'));
app.use('/csv2fd', require('./routes/csv2featureData'));
app.use('/trainmodel', require('./routes/trainmodel'));
app.use('/inference', require('./routes/inference'));
app.use('/machineLearningResults', require('./routes/machineLearningResults')); // Returns machine learning results JSON

app.use('/httpNotification', require('./routes/httpNotifications')); // Returns HTTP alerts JSON
app.use('/synNotification', require('./routes/synNotifications')); // Returns SYN alerts JSON
app.use('/udpNotification', require('./routes/udpNotifications')); // Returns UDP alerts JSON
app.use('/ICMPNotification', require('./routes/ICMPNotifications')); // Returns ICMP alerts JSON
app.use('/clearNotifications', require('./routes/clearNotifications')); // Clears all notifications

app.use('/initialize_attack_detection', require('./routes/initializeAttackDetection')); // Starts attack detection

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## Installation and Setup

To install and set up the IoT Device Identification and Vulnerability Analysis System, follow these steps:

### Prerequisites

- Kali Linux
- Node.js and npm
- Python
- nmap
- Git

### Steps

1. **Clone the Repository**: Clone the project repository from GitHub.
   ```bash
   git clone https://github.com/sahanediriweera/Analysis_of_IoT_Threat_Landscape
   cd Analysis_of_IoT_Threat_Landscape
   ```

2. **Install Backend Dependencies**: Navigate to the backend directory and install the necessary dependencies.
   ```bash
   cd backend/nodebackend
   npm install
   ```

3. **Install Frontend Dependencies**: Navigate to the frontend directory and install the necessary dependencies.
   ```bash
   cd ../../frontend
   npm install
   ```

4. **Start the Backend Server**: Navigate to the backend directory and start the server.
   ```bash
   cd ../backend/node_backend
   node server
   ```

5. **Start the Frontend Server**: Navigate to the frontend directory and start the React application.
   ```bash
   cd ../../frontend
   npm start
   ```

6. **Access the Application**: Open a web browser and navigate to `http://localhost:3000` to access the application.

## Usage

- **Network Scan**: Use the `/network_scan` endpoint to scan the network and get an array of IP addresses.
- **Port Scan**: Use the `/port_scan` endpoint to get a list of open ports on a specific IP address.
- **Device Scan**: Use the `/device_scan` endpoint to scan for IoT devices.
- **Vulnerability Analysis**: Use various endpoints such as `/dictionary_attack`, `/ddos`, `/httpAttack`, `/icmp`, `/syn`, and `/udp` to perform attacks on IoT devices and analyze vulnerabilities.
- **Machine Learning**: Use the machine learning endpoints to capture packets, convert them to CSV, extract features, train models, and make inferences.
- **Notifications**: Use the notification endpoints to get alerts for different types of attacks and clear notifications.

This project provides a comprehensive solution for identifying IoT devices and analyzing their vulnerabilities using machine learning and network scanning tools. It is designed to be extensible and customizable based on specific requirements and use cases.
