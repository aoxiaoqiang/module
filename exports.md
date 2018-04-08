# exports & module.exports

## 明确值类型和引用类型

基本类型 (primitive values): 包括Undefined, Null, Boolean, Number和String五种基本数据类型；
引用类型 (reference values): 保存在内存中的对象们，不能直接操作，只能通过保存在变量中的地址引用对其进行操作。

示例:

```javascript
// 值类型
var a = 123
var b = a
console.log(a)
console.log(b)

b = 456
console.log(a)
console.log(b)

// 引用类型
var c = { name: 'ABC' }
var d = c
console.log(c)
console.log(d)

d.name = 'new name'
console.log(c)
console.log(d)

d = { name: 'new reference' }
console.log(c)
console.log(d)

d.name = 'new reference ABC'
console.log(c)
console.log(d)

// 如果上面的理解了自测一下
var o = { a: 1}
var b = o
var c = { b: 2 }
console.log(b) // => {a: 1}
b = c;
console.log(b) //{b: 2}
console.log(o)//{a: 1}
```

说明: `d.name = 'new name'` 和 `d = { name: 'new reference' }` 前者是修改引用地址中的值，凡是引用此地址的值都是共有的，所以引用类型数据改变所有引用此地址的值都会改变。后者则是将变量`d`指向了一个新的引用地址，这意味着和它和原来的引用已经失去了所有联系。

### 探究 module.exports 和 exports

test.js

```javascript
console.log(module.exports)
console.log(exports)
console.log(module.exports === exports)
```

app.js

```javascript
const require('./test');
```

运行 `node app.js` 则输出下面结果

```bash
➜ node app.js
{}
{}
true
```

说明: 在引用的test.js模块中, 我们并没有进行 exports 和 module.exports 进行设置，但最后输出的确实一个空对象，并且`module.exports === exports`值为true。由此我们得出下面几个结论:

1. **[module.exports][node_module_exports] 对象是由模块系统创建的，并且初始化的值是 {}**。
2. **[exports][node_exports] 指向的是 module.exports 的引用**。NodeJS官网也有提到 “[exports][node_exports] 变量是在模块的文件级别作用域内有效的，它在模块被执行前被赋予 module.exports 的值。”

既然 exports 和 module.exports 指向的是同一个引用地址，那么接下来我们分别对两个进行赋值。

将test.js修改为

```javascript
module.exports = {
  name: 'Module Exports'
}

exports = {
  name: 'Exports',
}

console.log(module.exports)
console.log(exports)
console.log(module.exports === exports)
```

app.js修改为

```javascript
const test = require('./test')
console.log('-- app.js --')
console.log(test)
```

最终数据结果

```bash
➜ node app.js
{ name: 'Module Exports' }
{ name: 'Exports' }
false
-- app.js --
{ name: 'Module Exports' }
```

说明: test.js中我们对 module.exports和exports都进行了赋值，然而最终require之后得到的是 module.exports 的值。module.exports 被改变的时候，exports并没有被改变。**模块导出的时候，真正导出的执行是module.exports，而不是exports**。这里对两者进行赋值则 module.exports 和 exports 分别引用了不同的引用地址(理解同文档开头的示例), 此时 module.exports 和 exports已经失去了联系，没有任何关联。

因此我们再来看下面的例子

```javascript
exports.name = function() {
  console.log(x)
}

// 这样写和下面是一样的，因为都是修改的同一内存地址里的东西

module.exports.name = function() {
  console.log(x)
}
```

然而下面的却有很大区别

```javascript
exports = function() {
  console.log(x)
}

// 上面的写法 function 是一个新的内存地址，这里将 exports 指向了一个新的地址。完成赋值操作后 exports 和 module.exports 已经没有任何联系了。所以最终require()引用导出的仍然是 module.exports(默认指向的是个空对象{}) 的值。
// 下面的写法直接导出了一个 function，补充说明一下module.exports除了可以导出对象、函数，还可以导出类型、数值等。

module.exports = function() {
  console.log(x)
}
// module.exports = 23
// module.exports = new Number(23)
// module.exports = Array
```

![exports_1][doc/exports_1.png]

[node_exports]: http://nodejs.cn/api/modules.html#modules_exports_shortcut
[node_module_exports]: http://nodejs.cn/api/modules.html#modules_module_exports