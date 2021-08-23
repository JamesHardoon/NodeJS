/**
 * Buffer（缓冲区）
 *  - Buffer 的结构和数组很像，操作的方法也和数组类似
 *  - 数组中不能存储二进制的文件，而 buffer 就是专门用来存储二进制数据
 *  - 使用 buffer 不需要引入模块，直接使用即可
 *  - 在 buffer 中存储的都是二进制数据，但是在显示时都是以 16 进制的形式显示的
 *    - 在 buffer 中的每个元素的范围都是从 00 - ff
 *  - buffer 的大小一旦确定则不能修改，buffer 实际上是对底层内存的直接操作
 *  - buf.toString() 将缓冲区中的数据转换成字符串
 */ 

var str = "Hello Atguigu";

// 将一个字符串保存到 buffer 中
var buf = Buffer.from(str);

// console.log(buf);
// console.log(buf.length); // 占用内存的大小
// console.log(str.length); // 字符串的长度

// 创建一个指定大小的 buffer
// buffer 的所有构造函数都不推荐使用，推荐使用 alloc
var buf2 = new Buffer(1024);
// console.log(buf2.length);

var buf3 = Buffer.alloc(10);
buf3[0] = 88
buf3[1] = 255
buf3[2] = 0xaa; // 16 进制 aa
buf3[3] = 255;
// buffer 的大小一旦确定则不能修改
// console.log(buf3);

// 只要数字在控制台或页面输出一定是 10 进制
// console.log(buf3[2]); // 170
// console.log(buf3[2].toString(16)); // 转换为 16 进制的 字符串   输出 aa

for(var i = 0; i < buf3.length; i++) {
  // console.log(buf3[i].toString(16));
}

// Buffer.allocUnsafe(size) 创建一个指定大小的 buffer, 但是 buffer 中可能含有敏感数据，allocUnsafe 的性能要比 alloc 的性能好
var buf4 = Buffer.allocUnsafe(10);
console.log(buf4);

// buf.toString() 将缓冲区中的数据转换成字符串