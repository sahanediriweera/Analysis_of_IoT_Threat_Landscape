const { spawn } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises

const handleGetWithParams = async (req, res) => {

    ip_address = req.params.ip;

    const scriptPath = './../../Network Scan/portScannerAutomation.py';

    const scriptArgs = [ip_address];

    const scriptDirectory = path.dirname(scriptPath);

    const scriptFileName = path.basename(scriptPath);

    const childPython = await spawn('python', [scriptFileName,...scriptArgs], { cwd: scriptDirectory });

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    try{
        const data = await fsPromises.readFile(path.join(__dirname,'..','..','..','Network Scan',`open_ports_of_${ip_address}.json`),'utf8');
        console.log(data);
        res.json(data);
    }catch (err){
        console.log(err);
        res.send("An error occured try again");
    }
};

const handleGetWithoutParams = async (req, res) => {

    ip_address = req.query.ip;

    const scriptPath = './../../Network Scan/portScannerAutomation.py';

    const scriptArgs = [ip_address];

    const scriptDirectory = path.dirname(scriptPath);

    const scriptFileName = path.basename(scriptPath);

    const childPython = spawn('python', [scriptFileName,...scriptArgs], { cwd: scriptDirectory });

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    try{
        const data = await fsPromises.readFile(path.join(__dirname,'..','..','..','Network Scan',`open_ports_of_${ip_address}.json`),'utf8');
        console.log(data);
        res.json(data);
    }catch (err){
        console.log(err);
        res.send("An error occured try again");
    }
};

module.exports = {handleGetWithParams,handleGetWithoutParams};