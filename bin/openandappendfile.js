// Opening files and writing to files utility function
const fs = require("fs");

const openAppendFile = (pathName, data) => {
  return fs.open(`${pathName}`, "a", (openErr, fd) => {
    if (openErr) throw openErr;
    fs.appendFile(fd, `${data}`, "utf8", appendErr => {
      fs.close(fd, closeErr => {
        if (closeErr) throw closeErr;
      });
      if (appendErr) throw appendErr;
    });
  });
};

module.exports = openAppendFile;
