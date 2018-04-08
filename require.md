# require，import区别

require/exports 出生在野生规范当中，什么叫做野生规范？即这些规范是 JavaScript 社区中的开发者自己草拟的规则，得到了大家的承认或者广泛的应用。比如 CommonJS、AMD、CMD 等等。import/export 则是名门正派。TC39 制定的新的 ECMAScript 版本，即 ES6（ES2015）中包含进来。[链接](https://www.zhihu.com/question/56820346/answer/150724784)

require/exports 的用法只有以下三种简单的写法：

```js
const fs = require('fs')
exports.fs = fs
module.exports = fs
```

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

运行
> node app.js
> babel

创建 .babelrc 文件

```json
{
 "presets": ["env"]
}
```

```bash
npm install --save-dev babel-cli babel-preset-env --save
baba-node app.js
```
