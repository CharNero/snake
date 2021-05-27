// import et from 'element-theme'
import ora from 'ora'
import path from 'path'
import chalk from 'chalk'
import { promises as fs } from 'fs'
import { exec } from 'child_process'
import et from 'element-themex'

const config = require('../package.json')['element-theme']
const themes = [
  { primary: '#f00', name: 'red', skip: false, success: false },
  { primary: '#0f0', name: 'lightgreen', skip: false, success: false }
]

async function run(command: string, option = {}) {
  await new Promise((resolve, reject) => {
    exec(command, option, (err, stdout, stdin) => {
      if (err) reject(err)

      resolve({ stdout, stdin })
    })
  })
}

async function generator(color: string, name: string) {
  console.log(color)
  const varFile = path.resolve(process.cwd(), config.config)
  const reader = await fs.readFile(varFile)
  const newColor = reader.toString().replace(/\$--color-primary: [#0-9a-fA-F]{4,7} !default;/, `$--color-primary: ${color} !default;`)
  await fs.writeFile(varFile, newColor)
  await run(`./node_modules/.bin/et --out ${path.join(config.out, name)}`, {
    cwd: process.cwd()
  })
}

async function createConfigFile() {
  const spinner = ora('写入配置文件...').start()
  const file: {
    [prop: string]: string
  } = {}
  themes.forEach(item => item.success && (file[item.name] = `/themes/${item.name}/index.css`))
  try {
    await fs.writeFile(path.join(process.cwd(), config.out, 'config.json'), JSON.stringify(file))
    spinner.succeed('写入成功')
  } catch (error) {
    console.error(error)
    spinner.fail('写入失败')
  }
}

async function init() {
  console.group('构建主题···')
  console.log('初始化变量')
  await run('./node_modules/.bin/et -i', {
    cwd: process.cwd()
  })
  console.log('初始化变量成功')
  console.groupEnd()
}

async function loop() {
  console.group('读取配置')
  for (const color of themes) {
    console.log('=========================================================')
    if (color.skip) continue
    console.log('构建主题色 %s', chalk.bgHex(color.primary).white.bold(color.primary))
    await generator(color.primary, color.name)
    console.log('构建主题色 %s 构建成功', chalk.bgHex(color.primary).white.bold(color.primary))
    color.success = true
  }
  console.groupEnd()
}

async function execute() {
  const varFile = path.resolve(process.cwd(), config.config)
  et.init(varFile)
  for (const color of themes) {
    if (color.skip) continue
    const reader = await fs.readFile(varFile)
    const newColor = reader.toString().replace(/\$--color-primary: [#0-9a-fA-F]{4,7} !default;/, `$--color-primary: ${color} !default;`)
    await fs.writeFile(varFile, newColor)
    await et.run({
      out: path.join(config.out, color.name),
      config: varFile
    })
    color.success = true
  }
}

;(async function () {
  await init()
  await loop()

  // another
  // execute()

  await createConfigFile()
})()
