const { spawn } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;

const handleGetRequest = async (req, res) => {

    const scriptPath = './../../Attacks/icmp_detect_Automated.py';

    const scriptDirectory = path.dirname(scriptPath);

    const scriptFileName = path.basename(scriptPath);

    const childPython = await spawn('python3', [scriptFileName], { cwd: scriptDirectory });

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
        const data = await fsPromises.readFile(path.join(__dirname,'..','..','..','Attacks','icmp_flood_log.json'),'utf8');
        console.log(data);
        res.json(data);
    }catch(err){
        console.log(err);
        res.send("Bad Luck try again");
    }

};

module.exports = handleGetRequest;