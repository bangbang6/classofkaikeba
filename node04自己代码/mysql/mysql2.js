// mysql2提供promisy风格
;(async () => {
  let mysql = require('mysql2/promise')

  let cfg = {
    host: 'localhost',
    user: 'root',
    password: '15798015790liao',
    database: 'shop',
  }

  //建立和数据库的链接
  const connection = await mysql.createConnection(cfg)
  const SELECT_SQL = `SELECT * FROM item`
  //执行sql语句
  let [rows, cols] = await connection.execute(SELECT_SQL)
  console.log('rows', rows)
})()
