const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

router.get('/ip', (req, res) => {
    res.send('it works');

    ip_address = req.params.ip;

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
});
router.get('/', (req, res) => {
    res.send('it works');

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
});

module.exports = router;