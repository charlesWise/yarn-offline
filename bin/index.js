#!/usr/bin/env node
const program = require("commander");
const pgk = require("../package");

program.version(pgk.version);
program
  .command("install")
  .description("初始化下.yarnrc文件")
  .action(() => {
    require("../lib/init")();
  });

program
  .command("generate")
  .description("生成缓存及镜像文件")
  .action(() => {
    require("../lib/generate")();
  });

program.parse(process.argv);
