var http = require('http');

// 1.创建 Server
var server = http.createServer();

// 2.监听 request 请求事件，设置请求处理函数
server.on('request', function(req, res) {
  // console.log('收到请求了，请求路径是：' + req.url);

  // res.write('hello world');
  // res.write('hello node');
  // res.end();

  // 上面的方式比较麻烦，推荐直接使用 end 的方式
  // res.end('hello world! hello nodejs');

  // 根据不同的 请求路径，发送不同的响应结果
  // 1.获取请求路径
  // req.url 获取到的是端口号之后的那一部分路径
  // 也就是说所有的 url 都是以 / 开头的

  // 2.判断路径处理响应

  var url = req.url;
  var products = [
    {
      name: "华为",
      price: 9999
    },
    {
      name: "苹果",
      price: 8888
    },
    {
      name: "小米",
      price: 3999
    }
  ];

  res.setHeader('Content-Type', 'application/json', 'charset=utf-8');

  if (url === '/') {
    res.end('index page');
  } else if(url === '/login') {
    res.end('login page');
  } else if(url === '/product') {
    res.end(JSON.stringify(products));
  } else {
    res.end('404 Not Found');
  }
});

// 3.绑定端口号，启动服务
server.listen(80, function() {
  console.log('服务器启动成功，可以访问了。。。');
});