const inquirer = require("inquirer");
const clear = require("clear");
const fs = require("fs");
const utils = require("./utils");
const installConfig = require("./installConfig.js");

let yarnrcContent =
  '"cache-folder" "./yarn_cache"\r\n"network-timeout" "10000"\r\n"registry" "https://registry.npmjs.org/"\r\n"@mlamp:registry" "http://fe.mlamp.cn:2018/"\r\n--add.prefer-offline true\r\n--install.prefer-offline true\r\nyarn-offline-mirror-pruning true';
const defaultDir = "./tmp/pkgs-offline-cache";

module.exports = () => {
  clear();
  inquirer.prompt(installConfig.confirmDir).then(async (args) => {
    try {
      if (args.dir) {
        yarnrcContent = `${yarnrcContent}\r\n"yarn-offline-mirror" "${defaultDir}"`;
      } else {
        await inquirer.prompt(installConfig.inputDir).then((res) => {
          yarnrcContent = `${yarnrcContent}\r\n"yarn-offline-mirror" ".${res.dir}"`;
        });
      }
      if (utils.isFileFolderExist(".yarnrc")) {
        // 判断当前.yarnrc文件是否含有已经要写入的内容，已有无需重复追加
        const lines = fs.readFileSync(".yarnrc").toString();
        if (lines.includes("cache-folder")) return;
        await utils.appendFile(".yarnrc", `\r\n${yarnrcContent}`);
        console.log(".yarnrc文件内容追加成功");
      } else {
        await utils.writeFile(".yarnrc", yarnrcContent);
        console.log(".yarnrc文件写入成功");
      }
    } catch (error) {
      console.log(error);
    }
  });
};
