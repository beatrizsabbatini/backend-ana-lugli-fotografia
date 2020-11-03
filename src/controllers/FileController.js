const path = require('path');
const fs = require('fs');

module.exports = {

    async list(req, res){
        const { query } = req.body;
        console.log('query', query);

        const directoryPath = path.join(__dirname, '..', '..', 'uploads');

        fs.readdir(directoryPath, function (err, files) {

            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 

            const filteredFiles = files.filter(item => {
              if (item.includes(query)) return item;
            })
            return res.json(filteredFiles)
        });
  
    }, 
}