
var http = require('http');
var fs = require('fs');
var template = require('art-template');
var url = require('url');

var comments = [
  {
    name: 'zhangsan1',
    message: '今天天气不错',
    dateTime: '2021-09-09'
  },
  {
    name: 'zhangsan2',
    message: '今天天气不错',
    dateTime: '2021-09-09'
  },
  {
    name: 'zhangsan3',
    message: '今天天气不错',
    dateTime: '2021-09-09'
  },
  {
    name: 'zhangsan4',
    message: '今天天气不错',
    dateTime: '2021-09-09'
  },
  {
    name: 'zhangsan5',
    message: '今天天气不错',
    dateTime: '2021-09-09'
  },
];

http
  .createServer(function(req, res) {
    // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象(通过 query 属性来访问)
    var parseObj = url.parse(req.url, true);
    // 单独获取不包含查询字符串的路径部分(该路径 不包含 ？之后的内容)
    var pathname = parseObj.pathname;
    // var url = req.url;
    if (pathname === '/') {
      fs.readFile('./views/index.html', function(err, data) {
        if (err) {
          return res.end('404 Not Found.');
        }
        var htmlStr = template.render(data.toString(), {
          comments: comments
        });
        res.end(htmlStr);
      })
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', function (err,data) {
        if (err) {
          return res.end('404 Not Found');
        }
        res.end(data);
      })
    } else if (pathname.indexOf('/public/') === 0) {
      // 开放 public 下的所有资源 供访问
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found.');
        }
        res.end(data);
      });
    } else if (pathname === '/pinglun') {
      console.log('收到表单请求了：', parseObj.query);
      // res.end(JSON.stringify(parseObj.query))
      var comment = parseObj.query;
      // comment.dateTime = '2021-09-16 23:05:05';
      comment.dateTime = new Date( + new Date() + 8 * 3600 * 1000 ).toJSON().substr(0,19).replace("T"," ");
      comments.unshift(comment);
      // 临时重定向
      res.statusCode = 302;
      // 重定向到首页
      res.setHeader('Location', '/');
      res.end();
    } else {
      fs.readFile('./views/404.html', function (err,data) {
        if (err) {
          return res.end('404 Not Found');
        }
        res.end(data);
      })
    }

  })
  .listen(3003, function () {
    console.log('running...');
  })