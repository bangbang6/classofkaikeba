let path = require('path')
const fs = require('fs')
//!path.resolve() 方法会将路径或路径片段的序列解析为绝对路径 结果和当前工作目录有关即运行命令行的路径最终返回绝对路径
//!__dirname __dirname 总是指向被执行 js 文件的绝对路径，所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2和你在控制台运行的路径无关和文件所在位置有关
//!可以把他等同于'./'的绝对路径
module.exports = class TextNow {
  /**
   * 生成测试文件名
   * @param {*} filename 代码文件名
   */
  getTextFileName(filename) {
    let dirName = path.dirname(filename) //目录
    let baseName = path.basename(filename) //文件名
    let extName = path.extname(filename) //后缀
    let testName = baseName.replace(extName, `.spec${extName}`)
    return path.format({
      root: dirName + '/__test__/',
      base: testName,
    })
  }
  /**
   * 生成测试代码
   * @param {*} methodName 函数名
   * @param {*} classFile 文件名
   * @param {*} isClass 导出是否是类
   */
  getTextSource(methodName, classFile, isClass = false) {
    return `
test('${'test ' + methodName}',()=>{
  const ${isClass ? '{' + methodName + '}' : methodName}= require('${
      '../' + classFile
    }')
  const ret = ${methodName}()
  //expect(ret).toBe('test ret')
  })
  `
  }
  /**
   * 生成测试文件
   * @param {*} sourcePath 需要测试的文件路径
   */

  genJestSource(sourcePath = path.resolve('./')) {
    //一般fs的都是用绝对路径 用__dirname 或者 reslove处理下
    const testPath = `${sourcePath}/__test__`
    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath)
    }
    //对文件夹进行处理只处理文件
    let list = fs.readdirSync(sourcePath)
    list
      .map((v) => `${sourcePath}/${v}`)
      .filter((v) => fs.statSync(v).isFile())
      .filter((v) => v.indexOf('.spec') === -1)
      .map((v) => this.genTextFile(v))
  }
  /**
   * 生成文件名对应的测试文件
   * @param {*} filename 文件名
   */
  genTextFile(filename) {
    let testFileName = this.getTextFileName(filename)
    if (fs.existsSync(testFileName)) {
      console.log('测试文件已经存在')
      return
    }
    let mod = require(filename)
    let source
    if (typeof mod === 'object') {
      source = Object.keys(mod)
        .map((v) => this.getTextSource(v, path.basename(filename), true))
        .join('\n')
    } else if (typeof mod === 'function') {
      let baseName = path.basename(filename)
      source = this.getTextSource(baseName.replace('.js', ''), baseName, false)
    }
    fs.writeFileSync(testFileName, source)
  }
}
