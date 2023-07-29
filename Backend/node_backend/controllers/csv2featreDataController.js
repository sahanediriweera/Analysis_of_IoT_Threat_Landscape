const { spawn } = require('child_process');
const path = require('path');

const handleGetRequest = (req, res) => {
    res.send('it works');
    const scriptPath = './../../Device Finger Printing/convertCSV2FeatureDataAutomated.py';

    const scriptDirectory = path.dirname(scriptPath);

    const scriptFileName = path.basename(scriptPath);

    const childPython = spawn('python', [scriptFileName], { cwd: scriptDirectory });

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


module.exports = handleGetRequest;