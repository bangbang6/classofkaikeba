#!/usr/bin/env node
//上行代码 #！表示是脚本文件 可是用什么解释器执行本文件呢:可是不同用户或者不同的脚本解释器有可能安装在不同的目录下，系统如何知道要去哪里找你的解释程序呢？ /usr/bin/env就是告诉系统可以在PATH目录中查找,也就是配置的环境变量 node表示环境变量里的node指代的路径
//脚本shell文件作用是访问操作系统内核
//package json的BIn假如你发布了一个npm包，其中带有执行脚本，你希望用户安装你的npm包的时候，把可执行的脚本文件也安装下来，就会用到这个bin字段。 Bin里面就是一个可以直接执行的文件 如果我们需要这个直接执行这个可执行文件就的用Bin
//npm link表示这个包软连接到本地 相当于全局安啦这个包 不传参相当于和全局链接 传参相当于此参数和当前目录建立联系
//bin是二进制可执行文件 lib是库文件给别人调用的
let program = require('commander') //program是命令行
program.version(require('../package.json').version) //表示命令行执行V时候的执行的函数
program //命令行执行命令走的函数
  .command('init <name>')
  .description('init project')
  .action(require('../lib/init'))

  program.command('refresh')    
        .description('refresh routers...')    
        .action(require('../lib/refresh'))
program.parse(process.argv) //其中包含当 Node.js 进程被启动时传入的命令行参数kkb init abc相当于node inint abc(因为kkb这个文件用node解析)。 表示命令行解析node传进来的参数
