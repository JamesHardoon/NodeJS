var mongoose = require('mongoose');

Schema = mongoose.Schema
// 1.连接数据库
// 指定连接的数据库不需要存在，当插入第一条数据之后就会被自动创建出来
mongoose.connect('mongodb://localhost/test');

// 2.设计集合结构（即表结构）
// 字段名称就是表结构中的属性名称
// 值
// 约束的目的是为了保证数据的完整性，不要有脏数据
const userSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

// 3.将文档结构发布为模型
// mongoose.model 方法就是用来将一个架构发布为 model
// 第一个参数：传入一个大写名词单数字符串用来表示你的数据名称
//        mongoose 会自动将大写名词的自动穿生成 小写负数 的集合名称
//        例如这里的 User 最终会变为 users 集合名称
// 第二个参数：架构 Schema
// 返回值：模型构造函数
const User = mongoose.model('User', userSchema);

// 4.当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据进行操作
// 插入数据
// const admin = new User({
//   username: 'fangzhi',
//   password: '123456',
//   email: 'fangzhi@fangzhi.com'
// });

// // 5.持久化存储
// admin.save(function (err, ret) {
//   if (err) {
//     console.log('保存失败');
//   } else {
//     console.log('保存成功');
//     // console.log(ret);
//   }
// });

/**
 * 查询数据
 */
// 1.查询所有
User.find(function (err, ret) {
  if (err) {
    console.log('查询所有失败');
  } else {
    console.log('查询所有成功');
    console.log(ret);
  }
});

// 2. 按条件查询
// User.find({
//   username: 'fangzhi'
// },function (err, ret) {
//   if (err) {
//     console.log('按条件查询失败');
//   } else {
//     console.log('按条件查询成功');
//     console.log(ret);
//   }
// });

// 3. 只查询一个
// 不传第一个参数条件的话，查询出来的就是 集合中的第一条数据
// User.findOne({
//   username: 'fangzhi',
//   password: '123456'
// },function (err, ret) {
//   if (err) {
//     console.log('按条件查询失败');
//   } else {
//     console.log('只查询一个成功');
//     console.log(ret);
//   }
// });

/**
 * 删除数据
 */
// remove
// User.remove({
//   username: 'fangzhi'
// }, function(err, ret) {
//   if (err) {
//     console.log('删除失败');
//   } else {
//     console.log('删除成功');
//     console.log(ret);
//   }
// });
// deleteOne
// deleteMany

/**
 * 更新数据
 */
// findByIdAndUpdate
// User.findByIdAndUpdate('615ad015f2eb23f7c5d5f6fe', {
//   username: 'fangzhi',
//   password: 'fangzhi'
// }, function (err, ret) {
//   if (err) {
//     console.log('更新失败');
//   } else {
//     console.log('更新成功');
//     console.log(ret);
//   }
// });
