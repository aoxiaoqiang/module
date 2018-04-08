// console.log(module.exports)
// console.log(exports)
// console.log(module.exports === exports)

/*
exports.name = () => {
  console.log(x)
}

// 这样写和下面是一样的，因为都是修改的同一内存地址里的东西

module.exports.name = () => {
  console.log(x)
}*/

exports = function() {
  console.log(x)
}

// 上面的写法 function 是一个新的内存地址，这里将 exports 指向了一个新的地址。完成赋值操作后 exports 和 module.exports 已经没有任何联系了。所以最终require()引用导出的仍然是 module.exports(默认指向的是个空对象{}) 的值。
// 下面的写法直接导出了一个 function，补充说明一下module.exports除了可以导出对象、函数，还可以导出类型、数值等。

module.exports = new Number(23)


// 1.0
// module.exports = {
//   name: 'Module Exports'
// }

// exports = {
//   name: 'Exports'
// }


// 1.1
// exports.say = function() {
//   console.log('say')
// }

// exports.walk = () => {
//   console.log('walk')
// }


// 1.3
// module.exports = {
//   say: () => console.log('say'),
//   walk: () => console.log('walk')
// }


// 1.4
// module.exports = function() {
//   this.say = () => {
//     console.log(this)
//     // console.log('say')
//   }
// }

console.log(module.exports)
console.log(exports)
console.log(module.exports === exports)

// exports = module.exports = value
