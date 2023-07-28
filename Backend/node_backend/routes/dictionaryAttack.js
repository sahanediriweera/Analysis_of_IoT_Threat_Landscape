const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

router.get('/', (req, res) => {

    const ipAddress = req.query.ip;
    const port = req.query.port;

    res.send(`IP: ${ipAddress}, Port: ${port}`);

    const scriptPath = './../../Attacks/dictionaryAttackAutomated.py';

    const scriptArgs = [ipAddress, port];

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
});
router.get('/:ip/:port', (req, res) => {

    const ipAddress = req.params.ip;
    const port = req.params.port;

    res.send(`IP: ${ipAddress}, Port: ${port}`);

    const scriptPath = './../../Attacks/dictionaryAttackAutomated.py';

    const scriptArgs = [ipAddress, port];

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
});

module.exports = router;
