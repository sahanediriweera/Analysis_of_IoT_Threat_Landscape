const { spawn } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;

const handleDeleteFiles = async (req, res) => {
    try {
        // Check if the request body contains an array of file names to delete
        const fileNames= [
            "icmp_flood_log.json",
            "http_alerts.json",
            "udp_flood_alert.json",
            "syn_flood_log.json"
        ]

        if (!Array.isArray(fileNames)) {
            res.status(400).json({ message: 'Invalid request body. Please provide an array of file names to delete.' });
            return;
        }

        for (const fileName of fileNames) {
            const filePath = path.join(__dirname, '..', '..', '..', 'Attacks', fileName);

            const fileExists = await fsPromises.access(filePath)
                .then(() => true)
                .catch(() => false);

            if (!fileExists) {
                console.log(`File '${fileName}' not found`);
                continue; // Skip to the next file if it doesn't exist
            }

            await fsPromises.unlink(filePath); // Delete the file
            console.log(`File '${fileName}' deleted.`);
        }

        res.status(200).json({ message: 'Files deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = handleDeleteFiles;
