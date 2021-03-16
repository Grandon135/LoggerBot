const fs = require('fs');


exports.logMessage = (filename, msg) => {
    fs.appendFile(filename, msg, (error) => {
        return error;
    });
};
