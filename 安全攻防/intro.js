//!1.xss:cross site scritpting 跨站攻击
//指通过存在安全漏洞的Web网站注册用户的浏览器内运行非法的非本站点HTML标签或 JavaScript进行的一种攻击
//1. url参数直接注入 2.搜索框db持久注入
//解决:1.转义黑名单和白名单 富文本
//2.'X-XSS-Protection' 防止跨战脚本 header报头
//3.httpOnly防止获取cookie

//!2.csrf cross site requrest forgery 跨站请求伪造 即跨站请求伪造，是一种常见的Web攻击，它利用用户已登 录的身份，在用户毫不知情的情况下，以用户的名义完成非法操作。
/* 用户已经登录了站点 A，并在本地记录了 cookie 在用户没有登出站点 
A 的情况下（也就是 cookie 生效的情况下），
访问了恶意网站 B 此时浏览器依旧有a的cookie信息 这时候B网站请求a里面一样的请求去修改。 因为此时a没关闭且有cookie所以a的请求也会成功
 */
//防御 1.referer 2.验证码 人机验证 判断不是脚本发出的(最有效的)  3.服务器返回一个动态的内容然后必须返回一个动态的内容才能成功提交 一般脚本没意识到

//!3.点击劫持 是一种视觉欺骗手段 攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己 的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。
//在自己网页上包含啦真实网站(设置成透明) 诱惑你点击一下其他的东西 其实点击啦隐藏的真实网站发送了请求

//防御:1.x-frame-options http响应头 控制该页面以iframe在其他网站的请求不通过  2.如果其他用iframe self就不等于top 我们在js里面判断不等时候就是其他网站用 我们将这个网站重定向
//!const 定义的不可变量只是基本类型

const data = { name: 'bang' }
data.name = 'zhen'
console.log(data.name)
const name = 1
//name = 2 报错
console.log(name)

//!4.sql注入 '1'or'1'='1' password = '1' or '1' = '1'后面这个永真 所以会从数据库读出所有username的值
//防御 采用占位符 'password = ?' query(sql.[password])

//!5.os注入 和sql注入一样 只是对象是os 不是sql  比如git clone path(由用户输入) 加入用户输入的是 path && rm -rf /* 那么库被删掉了
//!6.dns劫持 ip->wifi->内网dns服务器 baidu.com->自己的黑客服务器

//!7.运营商劫持 wifi
//!8.ddos 使得服务器瘫痪 distributed denial of service 特殊协议攻击 syn-flood:第二次握手一直不握手 http-flood 发送大量http请求
//防御 备选网站 高防ip
