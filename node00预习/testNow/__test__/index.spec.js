/* test('test file name ', () => {
  let src = new (require('../index'))()
  let ret = src.getTextFileName('/abc/class.js')
  expect(ret).toBe('/abc/__test__/class.spec.js')
})
test('test file source', () => {
  let src = new (require('../index'))()
  let ret = src.getTextSource('fun', 'class.js')
  expect(ret).toBe(`
test('test fun',()=>{
  const fun= require('../class.js')
  const ret = fun()
  //expect(ret).toBe('test ret')
  })
  `)
}) */
let fs = require('fs')
test('test create file', () => {
  fs.rmdirSync(__dirname + '/data/__test__', { recursive: true })
  const src = new (require('../index'))()
  src.genJestSource(__dirname + '/data')
})
