/**
 * 模块化
 *  - 在 Node 中，一个 js 文件就是一个模块 
 *  - 在 Node 中，每一个 js 文件中的 js 代码都是独立运行在一个函数中,而不是全局作用域，所以一个模块中的变量和函数在其他模块中无法访问
 */

console.log('我是 02.module.js');


/**
 * 我们可以通过 exports 来向外部暴露变量和方法，只需要将需要暴露给外部的变量或方法设置为 exports 的属性即可
 */

// 向外部暴露属性或方法

exports.x = 10;
exports.y = 20;
exports.fn = function() {

}
