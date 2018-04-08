/**
 * nodejs模块
 *
 * require方能看到的只有module.exports这个对象，它是看不到exports对象的，而我们在编写模块时用到的exports对象实际上只是对module.exports的引用
 *
 * exports.obj = {}
 * moudle.exports = obj
 * 
 * 1. module.exports初始值是一个空对象 {}
 * 2. exports 指向的是 module.exports 的引用
 * 3. require() 返回的是 module.exports 而不是 exports
 * 4. exports 是模块内部的对象
 */


const test = require('./test')
console.log('-- app.js --')
console.log(test)