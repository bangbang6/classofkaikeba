let fs = require('fs')
//流
let rs = fs.createReadStream('./1.png')
let ws = fs.createWriteStream('./2.png')
//链接流的导管
rs.pipe(ws)
