const fs = require("fs");

const isFileFolderExist = (name) => {
  return fs.existsSync(name);
};

const writeFile = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, { flag: "a" }, (err) => {
      if (err) reject(err);
      else resolve("");
    });
  });
};

const appendFile = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, { flag: "a" }, (err) => {
      if (err) reject(err);
      else resolve("");
    });
  });
};

const isFolderExist = (path) => {
  // 判断文件夹是否存在, 不存在创建一个
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

module.exports = {
  isFileFolderExist: isFileFolderExist,
  writeFile: writeFile,
  appendFile: appendFile,
  isFolderExist: isFolderExist,
};
