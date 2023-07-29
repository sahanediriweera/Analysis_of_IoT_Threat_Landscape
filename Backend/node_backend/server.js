const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

app.use(logger);

// Cross Origin Resource Sharing
const whitelist = [ 'http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/',require('./routes/root'));

app.use('/packet_capturing',require('./routes/packet_capturing'));
app.use('/network_scan',require('./routes/networkScan'));
app.use('/port_scan',require('./routes/portScan'));
app.use('/test_encryption',require('./routes/text_encryption'));


app.use('/dictionary_attack',require('./routes/dictionaryAttack'));
app.use('/ddos',require('./routes/ddos'));
app.use('icmp',require('./routes/ICMP'));
app.use('/syn',require('./routes/syn'));
app.use('/udp',require('./routes/udp'));

app.use('/pcap2csv',require('./routes/pcap2csv'));
app.use('/csv2fd',require('./routes/csv2featureData'));
app.use('/trainmodel',require('./routes/trainmodel'));
app.use('/inference',require('./routes/inference'));


  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



