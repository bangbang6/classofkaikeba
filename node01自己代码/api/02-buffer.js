let buf1 = Buffer.from('a')
console.log(buf1.toString())
let buf2 = Buffer.alloc(10)
console.log('buf2', buf2)
let buf3 = Buffer.from('中文')
let buf4 = Buffer.concat([buf3, buf2])
console.log('buf4', buf4.toString())
