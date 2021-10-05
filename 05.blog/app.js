const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./router');
const app = express();

// 开放公共资源
// __dirname 获取的是动态的绝对路径
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))


// 配置模板引擎
// 在 Node 中有很多第三方模板引擎都可以使用，不是只有 art-template
// 比如 ejs、jade(改名为 pug)、handlebars、nunjucks...
app.engine('html', require('express-art-template'));
// 默认就是 ./views 目录
app.set('views', path.join(__dirname, './views/'));

// 配置中间件
// 配置解析表单 POST 请求体插件
// body-parser 插件 已被废弃，直接使用 express 即可
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// 注意要写在 app.use(router) 之前，否则会出现问题
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 在 Express 这个框架中，默认不支持 Session 和 Cookies
// 但是我们可以只用第三方中间件：express-session 来解决
// npm install express-session
// 注意：一定要在 app.use(router) 之前配置
// 当把这个插件配置好之后，我们就可以通过 req.session 来访问和设置 Session 成员
// 添加 Session 数据：req.session.foo = 'bar'
// 访问 Session 数据：req.session.foo
app.use(session({
  secret: 'keyboard cat', // 自定义配置加密字符串，在原有加密基础上和这个字符串拼进去加密
  resave: false,
  saveUninitialized: false, // 无论是否使用 Session, 都会默认直接给你分配一把钥匙(session)
}))
// 把 路由挂载到 app 中
app.use(router);

// 配置一个处理 404 的中间件
// 一点要写在 app.use(router) 之后
// 前面的中间件都不匹配的话就会来到处理 404 的中间件
app.use(function(req, res) {
  res.render('404.html');
})

// 配置一个全局错误处理中间件
// 4 个参数一定要写全
app.use(function(err, req, res, next) {
  // console.log('app error handler')
  // 需要全局配置错误的话，前面写的 app.status(500) 都可以不用写了
  // 直接替换成 return next(err)
  app.status(500).render({
    err_code: 500,
    message: err.message
  });
})

app.get('/', function (req, res) {
  res.render('index.html');
});

app.listen(5000, function () {
  console.log('running....');
});