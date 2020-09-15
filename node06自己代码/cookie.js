let http = require('http')
let session = {}
http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      res.end('')
      return
    }
    /* console.log('cookie', req.headers.cookie)
    //再次访问  !!同域名!!  的时候会加上cookie
    res.setHeader('Set-Cookie', 'cookie1=abc') */
    //session中用一个key这里用sid 因为有很多cookie我们这台浏览器就用sid 这个sid只是表示我们是session
    let sessionKey = 'sid'
    let cookie = req.headers.cookie

    if (cookie && cookie.indexOf(sessionKey) > -1) {
      const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
      const sid = pattern.exec(cookie)[1]
      //取出123456对应的内容
      console.log('session:', sid, session[sid])
    } else {
      //首次登录
      //随机生成session的内容 sid=随机数 随机数是key
      let sid = (Math.random() * 999999).toFixed()
      //sid=123456放在前端 前端只有sid即key的内容 对应的name：bang在后端存放
      res.setHeader('Set-Cookie', `${sessionKey} = ${sid}`)
      //后端存的是123456 = {name:bang}
      session[sid] = { name: '帮' }
    }
    res.end('hello cookie')
  })
  .listen(3000, () => {
    console.log(`listen at 3000`)
  })

//!cookie就是浏览器和后端服务器的约定 后端给前端set-cookie后cookie自动存放在前端application中 发请求自动包括applicaiton所有的cookie
