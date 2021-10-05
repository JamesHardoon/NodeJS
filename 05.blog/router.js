const express = require('express');
const router = express.Router();
const User = require('./models/user');
const md5 = require('blueimp-md5');
/**
 * 首页
 */
router.get('/', function(req, res) {
  // console.log('首页数据：', req.session.user);
  res.render('index.html', {
    user: req.session.user,
  })
});

/**
 * 注册、登陆、退出
 */
// 注册页面路由
router.get('/register', function(req, res) {
  res.render('register.html')
});

// 注册页面接口
// router.post('/register', function(req, res) {
//   // 1.获取表单提交的数据 req.body
//   // console.log('注册页面接口:',req.body);
//   // 2.操作数据库
//   // 2.1 判断用户是否已存在
//   // 2.2 如果已存在，不允许注册
//   // 2.3 如果不存在，注册新用户
//   const body = req.body;
//   User.findOne({
//     // 条件查询 或
//     $or: [
//       {
//         email: body.email,
//       },
//       {
//         nickname: body.nickname
//       }
//     ]
//   }, function(err, data) {
//     if (err) {
//       return res.status(500).send({
//         err_code: 500,
//         message: 'Server Error.'
//       })
//     }
//     // 如果邮箱已存在
//     if (data) {
//       // 邮箱或者昵称已存在
//       return res.status(200).json({
//         err_code: 1,
//         message: 'Email or nickname already exists!'
//       })
//     }
//     // send json 格式的数据
//     // return res.status(200).send(JSON.stringify({
//     //   code: 200,
//     //   data: {},
//     //   success: true,
//     //   message: '请求成功'
//     // }))

//     // 对密码进行加密
//     // 两次加密
//     body.password = md5(md5(body.password));

//     // 保存到数据库
//     new User(body).save(function (err, user) {
//       if (err) {
//         return res.status(500).send({
//           err_code: 500,
//           message: 'Server Error.'
//         })
//       }
//       // 使用 JSON.stringify 也比较麻烦
//       // Express 提供了一个方法 json 即可
//       // 改方法接受一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
//       return res.status(200).json({
//         err_code: 0,
//         message: 'OK'
//       })
//     })
//   })

//   // 3.发送响应
// });

// 注册页面接口
router.post('/register', async function(req, res) {
  // 1.获取表单提交的数据 req.body
  // console.log('注册页面接口:',req.body);
  // 2.操作数据库
  // 2.1 判断用户是否已存在
  // 2.2 如果已存在，不允许注册
  // 2.3 如果不存在，注册新用户
  const body = req.body;
  try {
    if (await User.findOne({ email: body.email })) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱已存在！'
      })
    }
    if (await User.findOne({ nickname: body.nickname })) {
      return res.status(200).json({
        err_code: 2,
        message: '昵称已存在！'
      })
    }
    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password));
    // 创建用户，执行注册
    const user = await new User(body).save(); // save() 表示保存到数据库中
    console.log(user, '-------')
    // 注册成功，使用 Session 记录用户的登陆状态
    req.session.user = user;

    return res.status(200).json({
      err_code: 0,
      message: 'OK！'
    })
  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: err.message,
    })
  }
  // 3.发送响应
});

// 登陆页面路由
router.get('/login', function(req, res) {
  res.render('login.html')
});

// 登陆页面接口
router.post('/login', function(req, res) {
  // 1.获取表单数据
  // 2.查询数据库用户名密码是否正确
  // 3.发送响应数据
  // 4.连接数据库进行查询
  const body = req.body;
  User.findOne({
    email: body.email,
    password: md5(md5(body.password)), // 加密查询
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message,
      })
    }

    if(!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'email or password is invalid',
      })
    }

    // 用户存在，登陆成功，通过 Session 记录登陆状态
    req.session.user = user;
    return res.status(200).json({
      err_code: 0,
      message: 'OK!',
    })
  })
});

// 登出页面路由
router.get('/logout', function(req, res) {
  // 清除登陆状态
  req.session.user = null;
  // 重定向到首页
  res.redirect('/login')

});

/**
 * 新建话题、删除话题、修改话题、查看话题列表等
*/


module.exports = router;