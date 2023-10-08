const { spawn } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;

const handleGetRequest = async (req, res) => {

    try{
        const data = await fsPromises.readFile(path.join(__dirname,'..','..','..','Attacks','syn_flood_log.json'),'utf8');
        console.log(data);
        res.json(data);
    }catch(err){
        console.log(err);
        res.send("Bad Luck try again");
        res.status(400).json({message:err});
    }

};

module.exports = handleGetRequest;