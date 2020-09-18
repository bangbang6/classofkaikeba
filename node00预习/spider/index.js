const originRequest = require('request')
const iconv = require('iconv-lite') //编码类型改成utf8
const cheerio = require('cheerio') //提取html里面的某个字段 就是后端的jquery

//封装reqest

function request(url, cb) {
  originRequest(url, { encoding: null }, cb)
}

for (let i = 100553; i < 100574; i++) {
  const url = `http://www.dy2018.com/i/${i}.html`
  request(url, (err, res, body) => {
    const html = iconv.decode(body, 'gb2312')
    const $ = cheerio.load(html)
    console.log($('.title_all h1').text())
  })
}
