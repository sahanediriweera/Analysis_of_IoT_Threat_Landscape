const { spawn } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;

const handleGetRequest = async (req, res) => {

    try {
        const filePath = path.join(__dirname, '..', '..', '..', 'Attacks', 'syn_flood_log.json');
        
        const fileExists = await fsPromises.access(filePath)
            .then(() => true)
            .catch(() => false);

        if (!fileExists) {
            res.status(404).json({ message: 'File not found' });
            return;
        }

        const data = await fsPromises.readFile(filePath, 'utf8');
        console.log(data);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }

};

module.exports = handleGetRequest;
