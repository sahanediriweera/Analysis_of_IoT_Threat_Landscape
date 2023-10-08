const { spawn } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;

const handleGetRequest = async (req, res) => {

    const scriptPath = './../../Attacks/AllAttacksAutomated.py';

    const scriptDirectory = path.dirname(scriptPath);

    const scriptFileName = path.basename(scriptPath);

    const childPython = await spawn('python3', [scriptFileName], { cwd: scriptDirectory });

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.status(200).json(data);
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).json(data);
    });

    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

};

module.exports = handleGetRequest;