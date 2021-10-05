const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_time: {
    type: Date,
    // 注意：这里不要写 Date.now() 因为会即刻调用
    // 这里直接给了一个方法： Date.now 方法
    // 当你去 new Model 的时候，如果你没有传递 create_time，则 mongoose 就会调用 Date.now 方法，使用其返回值作为默认值
    default: Date.now,
  },
  last_modify_time: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png',
  },
  bio: { 
    type: String,
    default: '',
  },
  gender: { 
    type: Number,
    enum: [-1,0,1], // 保密 女 男
    default: -1, // 默认为 保密
  },
  birthday: { 
    type: Date,
  },
  status: { 
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0,
  }
});

module.exports = mongoose.model('Comment', CommentSchema);