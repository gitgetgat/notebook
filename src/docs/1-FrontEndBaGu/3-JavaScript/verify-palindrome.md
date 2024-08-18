# 验证回文串

<article-info/>

::: code-group

```js
/**
 * 验证回文串
 * 回文串：一个字符串，忽略大小写和非字幕数字，正着读和反着读都是一样的
 * 例如：A man, a plan, a canal: Panama
 */
var isPalindrome = function (s) {
  // 只保留字符和数字
  const isValid = (c) => (c >= "a" && c <= "z") || (c >= "0" && c <= "9");
  let i = 0,
    j = s.length - 1;
  while (j >= i) {
    const left = s[i].toLowerCase(),
      right = s[j].toLowerCase();
    if (!isValid(left)) {
      // 不符合判断，移动下标
      i++;
    } else if (!isValid(right)) {
      // 不符合判断，移动下标
      j--;
    } else if (left === right) {
      // 相同则判断下一个字符
      i++;
      j--;
    } else {
      // 发现不同返回 false
      return false;
    }
  }
  // 整体循环完毕，则表明是回文串
  return true;
};

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("A cman, a plan, a canal: Panambsa")); // false
```

:::
