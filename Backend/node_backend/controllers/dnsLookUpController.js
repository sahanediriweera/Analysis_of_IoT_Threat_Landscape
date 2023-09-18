const { spawn } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;

const handleGetRequest = async (req, res) => {

    ip_address = req.query.ip;

    const scriptPath = './../../Network Scan/dnsLookUpAutomated.py';

    const scriptDirectory = path.dirname(scriptPath);

    const scriptFileName = path.basename(scriptPath);

    const scriptArgs = [ip_address];

    const childPython = await spawn('python3', [scriptFileName,...scriptArgs], { cwd: scriptDirectory });

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
                const data = await fsPromises.readFile(path.join(__dirname, '..', '..', '..', 'Network Scan', 'domain_names.json'), 'utf8');
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