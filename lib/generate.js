const clear = require("clear");
const utils = require("./utils");

const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

const del = async (filePath) => {
  return new Promise((resolve) => {
    const { exec } = require("child_process");
    exec(`rm -rf ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.log("delete error");
      }
      resolve();
      console.log("delete success");
    }).on("exit", function (code) {
      console.log("子进程已退出，退出码 " + code);
    });
  });
};

module.exports = async () => {
  clear();
  if (
    !utils.isFileFolderExist(".git") &&
    !utils.isFileFolderExist("node_modules")
  ) {
    return;
  }
  try {
    await del("node_modules");
    await spawn("yarn");
  } catch (error) {
    console.log(error);
  }
};
