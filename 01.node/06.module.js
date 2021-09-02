// exports.name = 'Fitz';
// exports.age = 18;
// exports.sayName = function(name, age) {
//   console.log(`我是${name}, 今年 ${age} 岁！`)
// }

/**
 * module.exports 和 exports 区别？
 *  - 通过 exports 只能用 . 的形式来向外暴露内部变量
 *    exports.xxx = xxx;
 *  - 而 module.exports 即可以通过 . 的形式, 也可以直接赋值
 *    - module.exports.xxx = xxx;
 *    - module.exports = {};
 *  - 注意：要是实在区分不开的话，直接使用 module.exports 就不会错
 */

module.exports = {
  name: 'Fitz',
  age: 18,
  sayName: function(name, age) {
    console.log(`我是${name}, 今年 ${age} 岁！`)
  }
}