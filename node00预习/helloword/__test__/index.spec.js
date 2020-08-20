test('测试hello world', () => {
  let hello = require('../index')
  expect(hello).toBe('hello node')
})

//jest必须在包里面才会执行 packagejson是一个配置文件
