const { spawn } = require('child_process');
const path = require('path');

const handleGetRequestWithoutParams = (req, res) => {

    const ip = req.query.ip;

    res.send(`IP: ${ipAddress}, Port: ${port}`);

    const scriptPath = './../../Attacks/ICMPAutomated.py';

    const scriptArgs = [ip];

    const scriptDirectory = path.dirname(scriptPath);
    const scriptFileName = path.basename(scriptPath);

    const childPython = spawn('python', [scriptFileName, ...scriptArgs], { cwd: scriptDirectory });

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

const handleGetRequestWithParams = (req, res) => {

    const ip = req.params.ip;

    res.send(`IP: ${ipAddress}, Port: ${port}`);

    const scriptPath = './../../Attacks/ICMPAutomated.py';

    const scriptArgs = [ip];

    const scriptDirectory = path.dirname(scriptPath);
    const scriptFileName = path.basename(scriptPath);

    const childPython = spawn('python', [scriptFileName, ...scriptArgs], { cwd: scriptDirectory });

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = {handleGetRequestWithParams,handleGetRequestWithoutParams};