import fs from 'fs'
import path from 'path'

interface InputConfig {
  /**
   * 入口根目录，绝对路径
   */
  dirname?: string
  /**
   * 可被识别的入口文件名或正则
   */
  pattern?: string | RegExp
  /**
   * 最大深度
   */
  maxLevel?: number
}

const defaultConfig: InputConfig = {
  dirname: path.resolve(__dirname, '../pages'),
  pattern: 'index.html',
  maxLevel: 5,
}

export function getInput(config: InputConfig = {}): Record<string, string> {
  const mergeConfig = {
    ...defaultConfig,
    ...config,
  }
  const entry = getEntry({
    dirname: mergeConfig.dirname,
    deep: 0,
    entryName: 'pages',
    pattern: mergeConfig.pattern,
    maxLevel: mergeConfig.maxLevel,
  })
  const input = entry.reduce((pre, curr) => {
    pre[`${curr.dirname}_${curr.deep}`] = curr.entry
    return pre
  }, {})
  console.log(`entry: ${JSON.stringify(input, null, 1)}\n`)
  return input
}

/**
 * 递归遍历目标文件夹查找匹配的入口文件
 */
function getEntry(config: {
  dirname: string
  deep: number
  entryName: string
  pattern: string | RegExp
  maxLevel: number
}) {
  const result: {
    dirname: string
    entry: string
    deep: number
  }[] = []
  const files = []
  const dirs = []
  const ls = fs.readdirSync(config.dirname)

  ls.forEach((str) => {
    if (fs.lstatSync(path.resolve(config.dirname, str)).isFile()) {
      files.push(str)
    } else {
      dirs.push(str)
    }
  })

  const currentEntry = matchEntry(files, config.pattern)
  if (currentEntry.length) {
    result.push(
      ...currentEntry.map((entry) => ({
        dirname: config.entryName,
        entry: path.resolve(config.dirname, entry),
        deep: config.deep,
      })),
    )
  }

  if (dirs.length && config.deep <= config.maxLevel) {
    dirs.forEach((dir) => {
      result.push(
        ...getEntry({
          dirname: path.resolve(config.dirname, dir),
          deep: config.deep + 1,
          entryName: dir,
          pattern: config.pattern,
          maxLevel: config.maxLevel,
        }),
      )
    })
  }

  function matchEntry(files: string[], pattern: string | RegExp) {
    return files.filter((name) =>
      typeof pattern === 'string' ? name === pattern : pattern.test(name),
    )
  }

  return result
}
