#!/usr/bin/env node
const inquirer = require('inquirer')
const version = require('../package.json').version


const opt = {
  '初始化脚⼿架': "init",
  '启动项⽬': "start",
  '创建⼦项⽬': "create",
  '编译组件库': "compile",
  '版本发布': "",
  'Eslint格式校验': "",
  '退出': "quit",
}
const question = [
  {
    type: "rawlist" /* 选择框 */,
    message: "请选择操作？",
    name: "operation",
    choices: Object.keys(opt),
  },
]

const question2 = [
  {
    type: "rawlist" /* 选择框 */,
    message: "请选择下一步",
    name: "next",
    choices: ['1', '2'],
  },
]

query()

async function query () {
  const answer = await inquirer.prompt(question)

  const nextanswer = await inquirer.prompt(question2)
  console.log('answer: ', answer)
}
