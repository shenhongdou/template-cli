
const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const download = promisify(require('download-git-repo'))

const clear = require('clear')
const chalk = require('chalk')
const ora = require('ora')
const open = require('open')

const log = content => console.log(chalk.green(content))

function spawnHandle(...args) {
  const { spawn } = require('child_process')
  return new Promise((resolve) => {
    const child_process = spawn(...args)

    child_process.stdout.pipe(process.stdout)
    child_process.stderr.pipe(process.stderr)
    child_process.on('close', () => {
      console.log('---------close--------')
      resolve()
    })
  })
}

async function clone (repo, desc) {
  const progress = ora(`正在下载${repo}......`)
  progress.start()
  try {
    await download(repo, desc, { clone: false })
    progress.succeed('下载完成')
    return true
  } catch (error) {
    console.log(error)
    progress.fail('下载失败')
    return false
  }
}

module.exports = async name => {
  clear()
  log(await figlet(`WELCOME`))

  const res = await clone('github:shenhongdou/vue2-template#main', name)

  if (!res) return

  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  log('正在安装依赖...')
  await spawnHandle(npm, ['install'], { cwd: `./${name}` })
  log('正在启动服务器...')
  await open('http://localhost:8080')
  await spawnHandle(npm, ['run', 'serve'], { cwd: `./${name}` })
}