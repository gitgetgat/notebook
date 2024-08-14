# == 和 === 有什么不同？

<article-info/>

简单来说 `==` 是先转换类型再比较，`===` 会先判断类型再比较，如果不为同一类型直接为 false，`===` 表示恒等，两边要绝对相同才为 true

- `===` 的具体比较规则，如下：
  1. 如果类型不同，则不相等
  2. 如果类型相同，则进行值比较，如果值不相同也就不相等，如果值相同则相等
  3. 例外的是，`NaN` 互相比较或者有一个为 `NaN`，则都是不相等，判断 `NaN` 用 `isNaN（）`这个函数进行判断
- `==` 的具体比较规则，如下：
  1. `NaN` 和其它任何值比较都是 `false`，包括它自己
  2. 如果两个值类型相同，进行 `===` 比较，比较规则同上
  3. 如果两个值类型不同，他们可能相等。根据下面规则进行类型转换再比较：
     1. 如果一个是 `null`、一个是 `undefined`，那么相等；除此之外 `null` 和 `undefined` 和其他值的比较都是 `false`
     2. 如果一个是 `string`，一个是 `number`，把字符串转换成数值再进行比较。
     3. 如果任一值是 `boolean`，把它转换成 `1` 再比较；如果任一值是 `false`，把它转换成 `0` 再比较。
     4. 如果一个是对象，另一个是数值或字符串，把对象转换成基础类型的值再比较。对象转换成基础类型，利用它的 `toString` 或者 `valueOf` 方法。
- 单个变量转换 `Boolean` 的时候：只有 `null`、`undefined`、`''`、`NaN`、`0`、`false` 这几个是 `false`，其他的情况都是 `true`，比如 `{}` , `[]`。
- 什么是 `ToPrimitive` 规则？
  JS 引擎内部转换为原始值 `ToPrimitive(obj,preferredType)` 函数接受两个参数，第一个 `obj` 为被转换的对象，第二个 `preferredType` 为希望转换成的类型（默认为空，接受的值为 `Number` 或 `String`）在执行 `ToPrimitive(obj,preferredType)` 时如果第二个参数为空并且 `obj` 为 `Date` 的实例时，此时 `preferredType` 会被设置为 `String`，其他情况下 `preferredType` 都会被设置为 `Number`。
  - 如果 `preferredType` 为 `Number`，`ToPrimitive` 执行过程如下：
    1. 如果 `obj` 为原始值，直接返回；
    2. 否则调用 `obj.valueOf()`，如果执行结果是原始值，返回之；
    3. 否则调用 `obj.toString()`，如果执行结果是原始值，返回之；
    4. 否则抛异常。
  - 如果 `preferredType` 为 `String`，将上面的第 <el-text size="large" type="warning">2</el-text> 步和第 <el-text size="large" type="warning">3</el-text> 步调换，即：
    1. 如果 `obj` 为原始值，直接返回；
    2. 否则调用 `obj.toString()`，如果执行结果是原始值，返回之；
    3. 否则调用 `obj.valueOf()`，如果执行结果是原始值，返回之；
    4. 否则抛异常。
