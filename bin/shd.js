#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const version = require('../package.json').version
const download = require('./download')

program.version(version)

const log = content => console.log(chalk.green(content))

program.command('create <name>')
  .description('下载模板')
  .action(name => {
    download(name)
  })

program.command('init')
  .option('-p, --preset <preset>', 'template preset')
  .action(({ preset }) => {
    console.log(preset, '---------preset--------')
    // console.log(args.args, 'args')
    console.log(program.opts(), 'config')
  })

program.parse(process.argv)
