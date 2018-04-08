# export default 和 export 区别

1. export与export default均可用于导出常量、函数、文件、模块等
2. 你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用。
3. 在一个文件或模块中，export、import可以有多个，export default仅有一个。
4. 通过export方式导出，在导入时要加{ }，export default则不需要。
5. 有无default, import 的引用方式不同

```javascript
export function Func () { }
import { Func } from 'func'

export default function Func () { }
import Func from 'func'
```

示例

module.js

```javascript
'use strict'
//导出变量
export const a = '100';  

 //导出方法
export const dogSay = function(){ 
    console.log('wang wang');
}

 //导出方法第二种
function catSay(){
   console.log('miao miao'); 
}
export { catSay };

//export default导出
const m = 100;
export default m; 
//export defult const m = 100;// 这里不能写这种格式。
```

index.js

```javascript
//index.js
'use strict'
var express = require('express');
var router = express.Router();

import { dogSay, catSay } from './testEs6Export'; //导出了 export 方法 
import m from './testEs6Export';  //导出了 export default 

import * as testModule from './testEs6Export'; //as 集合成对象导出



/* GET home page. */
router.get('/', function(req, res, next) {
  dogSay();
  catSay();
  console.log(m);
  testModule.dogSay();
  console.log(testModule.m); // undefined , 因为  as 导出是 把 零散的 export 聚集在一起作为一个对象，而export default 是导出为 default属性。
  console.log(testModule.default); // 100
  res.send('恭喜你，成功验证');
});

module.exports = router;
```

[export 和 export default](https://segmentfault.com/a/1190000010426778#articleHeader3)