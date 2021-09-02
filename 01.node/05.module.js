/**
 *  在 node 中有一个全局对象 global，它的作用和网页中的 window 类似
 *    在全局中创建的变量都会被作为 global 的属性保存
 *    在全局中创建的函数都会被作为 global 的方法保存
 * 
 *  当 node 在执行模块中的代码是，它会首先在代码的最顶部，添加如下代码：
 *    function (exports, require, module, __filename, __dirname) {
 *  在代码的最底部添加如下代码：
 *    }
 *  实际上模块中的代码都是包装在一个函数中执行的，并且在函数执行时，同时传递进了 5 个实参
 *    exports
 *      - 该对象用来将遍历或函数暴露到外部
 *    require
 *      - 函数，用来引入外部的模块
 *    module
 *      - module 代表的是当前模块本身
 *      - exports 就是 module 的属性
 *      - 既可以使用 exports 导出，也可以使用 module.exports 导出，本质上是一样的
 *    __filename
 *      - 当前模块的完整路径
 *    __dirname
 *      - 当前模块所在文件夹的完整路径
 */

var a = 10; // 只能在模块中使用，如果定义为 a = 10 那么在全局中就能查看到 consolo.log(global.a)

/**
 * arguments.callee
 *  - 这个属性保存的是当前执行的函数对象
 */

// console.log(arguments.callee + '');
// console.log(exports); // {}
// console.log(require);
// console.log(module);
// console.log(module.exports === exports); // true
// console.log(__filename); // /Users/fangzhi/Documents/website/JamesHardoon/nodejs/01.node/04.module.js
// console.log(__dirname); // /Users/fangzhi/Documents/website/JamesHardoon/nodejs/01.node
