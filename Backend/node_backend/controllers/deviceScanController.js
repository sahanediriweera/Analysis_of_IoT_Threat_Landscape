const { spawn } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;

const handleGetRequest = async (req, res) => {

    const scriptPath = './../../Network Scan/deviceScanAutomation.py';

    const scriptDirectory = path.dirname(scriptPath);

    const scriptFileName = path.basename(scriptPath);

    const childPython = await spawn('python', [scriptFileName], { cwd: scriptDirectory });

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childPython.on('close', async (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
            try {
                const data = await fsPromises.readFile(path.join(__dirname, '..', '..', '..', 'Network Scan', 'device_scan_results.json'), 'utf8');
                console.log(data);
                res.json(data);
            } catch (err) {
                console.log(err);
                res.status(404).send("Bad Luck try again");
            }
        } else {
            res.status(404).send("Bad Luck try again");
        }
    });

};

module.exports = handleGetRequest;
