
// 1.引包
var express = require('express');
var app = express();

// 2.创建 Server 相当于 之前的 http.createServer

// 公开指定目录
// 只要这样做了，就可以直接通过 /public/xxx 的方式访问 public 目录下的所有资源了
// 要想公开哪些目录都可以通过类似的方式
app.use('/public/', express.static('./public/'));

// 配置使用 art-template 模板引擎 
// 第一个参数，表示 当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express
// 中，虽然外面这里不需要加载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'));
app.set('view engine', {
  debug: process.env.NODE_ENV !== 'production'
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]
// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用的，但是如果配置了模板引擎就可以使用了
// res.render('html 模板名', {模板数据})
// 第一个参数不能写路径，默认回去项目中的 views 目录中查找改模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中 
app.get('/', function(req, res) {
  res.render('index.html', {
    comments: comments
  });
});

app.get('/post', function (req, res) {
  res.render('post.html')
})

app.get('/pinglun', function(req, res) {
  console.log(req.query);
  var comment = req.query;
  comment.dateTime = '2021-10-02 22:59:16';
  comments.unshift(comment);
  /**
   * res.statusCode = 302;
   * res.setHeader('Location', '/');
   */
  res.redirect('/');
})
// 当以 post 请求 /post 的时候，执行指定的处理函数
// 这样的话我们就可以利用不用的请求方法让一个请求路径使用多次
app.post('/post', function(req, res) {
  console.log('收到表单 post 请求了');
  console.log(req.body);
  var comment = req.body;
  comment.dateTime = '2021-10-02 22:59:16';
  comments.unshift(comment);
  res.redirect('/');
})

// 如果想要修改默认的 views 目录，则可以这么操作
// 第一个参数 views 不能写错
// app.set('views', render 函数的默认路径)

// 可以使用一个第三方命令行工具：nodemon 来帮我们解决频繁修改代码重启服务器问题
// nodemon 是一个基于 Node.js 开发的第三方命令行工具，使用时独立安装 npm install --global nodemon
// 使用 nodemon app.js

// 相当于 server.listen
app.listen(3000, function() {
  console.log('app is listening on port 3000')
})

