/**
 * 在 www.npmjs.com 中搜索 mysql 查看相应的文档即可
 */

const mysql = require('mysql');

// 1.创建连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'User'
});

// 2.连接数据库
connection.connect();

// 3.执行数据操作
// SELECT 1 + 1 AS solution
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
  // console.log('The solution is: ', results[0].solution);
// });

/**
 * 增删改查都在 connection.query 方法中写
 */
// 查
connection.query('SELECT * FROM `users`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

// 增
// connection.query('INSERT INTO users VALUES (null, "fangzhi", "888888")', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
//   // console.log('The solution is: ', results[0].solution);
// });

// 4.关闭连接
connection.end();