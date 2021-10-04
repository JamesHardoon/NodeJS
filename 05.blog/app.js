const express = require('express');
const path = require('path');

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

app.get('/', function (req, res) {
  res.render('index.html', {
    name: 'Hello Express! Hello Blog!'
  });
});

app.listen(5000, function () {
  console.log('running....');
});