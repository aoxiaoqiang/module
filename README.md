# nodejs 和 es6中的模块引用

exports、module.exports和export、export default、import、require等都是模块引用相关对象或方法。之前一直很混乱，今天来理一理。

require/exports 出生在野生规范当中，什么叫做野生规范？即这些规范是 JavaScript 社区中的开发者自己草拟的规则，得到了大家的承认或者广泛的应用。比如 CommonJS、AMD、CMD 等等。import/export 则是名门正派。TC39 制定的新的 ECMAScript 版本，即 ES6（ES2015）中包含进来。[来源地址](https://www.zhihu.com/question/56820346/answer/150724784)

## 使用范围

> require: node 和 es6 都支持的引入
>
> export / import : 只有es6 支持的导出引入
>
> module.exports / exports: 只有 node 支持的导出

## NodeJs中的模块引用

Node里面的模块系统遵循的是CommonJS规范。那问题又来了，什么是CommonJS规范呢？由于js以前比较混乱，各写各的代码，没有一个模块的概念，而这个规范出来其实就是对模块的一个定义。

CommonJS定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)

[exports 和 module.exports的区别](./exports.md)

require/exports 的用法只有以下三种简单的写法：

```js
const fs = require('fs')
exports.fs = fs
module.exports = fs
```

## es6中模块引用

[require/exports 和 import/export区别](./es6-import.md)

而 import/export 的写法就多种多样：import fs from 'fs'

```js
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```
