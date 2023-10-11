const { spawn } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;

const handleGetRequestWithoutParams = async (req, res) => {

    const ipAddress = req.query.ip;
    const port = req.query.port;

    const scriptPath = './../../Attacks/dictionaryAttackAutomated.py';

    const scriptArgs = [ipAddress, port];

    const scriptDirectory = path.dirname(scriptPath);
    const scriptFileName = path.basename(scriptPath);

    const childPython = await spawn('python', [scriptFileName, ...scriptArgs], { cwd: scriptDirectory });

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childPython.on('close', async (code) => {
        console.log(`child process exited with code ${code}`);

        try {
            const data = await fsPromises.readFile(path.join(__dirname, '..', '..', '..', 'Attacks', `results_of_${ipAddress}_${port}.json`), 'utf8');
            console.log(data);
            res.json(data);
        } catch (err) {
            res.send("Still processing, please wait");
        }
    });
}


const handleGetRequestWithParams = async (req, res) => {

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

    try{
        const data = await fsPromises.readFile(path.join(__dirname,'..','..','..','Attacks',`results_of_${ipAddress}_${port}.json`),'utf8');
        console.log(data);
        res.json(data);
    }catch (err){
        res.send("Still processing Wait");
    }
}

module.exports = {handleGetRequestWithParams,handleGetRequestWithoutParams};