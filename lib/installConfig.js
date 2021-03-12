const chalk = require("chalk");
const confirmDir = [
  {
    name: "dir",
    type: "confirm",
    message: `选择Y默认以${chalk.gray(
      "/tmp/pkgs-offline-cache"
    )}为离线缓存镜像目录`,
  },
];

const inputDir = [
  {
    name: "dir",
    type: "input",
    message:
      "请输入离线缓存镜像目录" + chalk.gray("(例: /tmp/pkgs-offline-cache)："),
    validate(value) {
      if (value.length) {
        return true;
      } else {
        return "此选项将会影响离线缓存镜像目录文件读取，不写默认为/tmp/pkgs-offline-cache";
      }
    },
  },
];

module.exports = {
  confirmDir: confirmDir,
  inputDir: inputDir,
};
