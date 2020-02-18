// Opening files and writing to files utility function
const fs = require("fs");

const openAppendFile = (pathName, data) => {
  return fs.open(`${pathName}`, "a", (err, fd) => {
    if (err) throw err;
    fs.appendFile(fd, `${data}`, "utf8", err => {
      fs.close(fd, err => {
        if (err) throw err;
      });
      if (err) throw err;
    });
  });
};

exports = module.exports = openAppendFile;
