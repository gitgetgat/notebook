# 前端的加密算法有哪些？

<article-info/>

## Base64 加密

- `Base64`，顾名思义，就是包括小写字母 a-z、大写字母 A-Z、数字 0-9、符号"+"、"/"一共 64 个字符的字符集，（另加一个“=”，实际是 65 个字符，至于为什么还会有一个“="，这个后面再说）。任何符号都可以转换成这个字符集中的字符，这个转换过程就叫做 [base64 编码](https://so.csdn.net/so/search?q=base64%E7%BC%96%E7%A0%81&spm=1001.2101.3001.7020) 。

::: code-group

```js
<script>
  let str = 'ImGod'; let str64 = window.btoa(str);
  console.log('转化后：'+str64); let jm = window.atob(str64);
  console.log('解码后：'+jm);
</script>
```

:::

## MD5 加密（不可逆）

- `MD5`是一种被广泛使用的密码散列函数，可以产生出一个 128 位（16 字节）的散列值（hash value），用于确保信息传输完整一致。MD5 由美国密码学家罗纳德·李维斯特（Ronald Linn Rivest）设计，于 1992 年公开，用以取代 `MD4` 算法。

- `md5.js` 是通过前台 js 加密的方式对密码等私密信息进行加密的工具。

  ::: code-group

  ```jsx
  <script src="https://cdn.bootcss.com/blueimp-md5/2.12.0/js/md5.min.js"></script>
  <script>

      // MD5加密方式

      // hex_md5(data);//data表示你要加密的数据

      let str = 'abc';

      let newStr = md5(str);

      console.log(newStr); // 909150983cd24fb0d6963f7d28e17t72

  </script>
  ```

  :::

## sha1 加密（不可逆）

- `SHA-1` 是一种数加密算法，该算法的思想是接收一段明文，然后以一种不可逆的方式将它转换成一段（通常更小）密文，也可以简单的理解为取一串输入码（称为预映射或信息），并把它们转化为长度较短、位数固定的输出序列即散列值（也称为信息摘要或信息认证代码）的过程。

  ::: code-group

  ```js
  <script src="https://cdn.bootcss.com/js-sha1/0.6.0/sha1.js"></script>
  <script>

      //sha1加密方式

      let str = 'abcd';

      let sha_1 = sha1(str);

      console.log(sha_1); // 81fe8bfe87576c3ecb22426f8e57847382917acf

  </script>
  ```

  :::

## 编码和解码字符串

- 这个主要是使用 JS 函数的 `escape()` 和 `unescape()`，分别是编码和解码字符串。
- `escape` 采用 `ISO Latin` 字符集 对指定的字符串进行编码。所有的空格符、标点符号、特殊字符以及其他非 `ASCII` 字符都将被转化成 `%xx` 格式的字符编码（xx 等于该字符在字符集表里面的编码的 16 进制数字）
- 在很多脚本语言的应用当中，`escape` 函数是一个可转换编码的函数,比如 javascript 的 ajax 中,向 a.php 传递参数 `?city=北京` ,可先将 "北京" 用 `escape` 重新编码,再进行传递,在服务器端接收后再解码才不会出现乱码。`escape` 一般用于传递 URL 参数和类似 `urlencode` `base64_encode`函数是类似的。

  ::: code-group

  ```js
  <script>
    //编码和解码字符串 let str = '在山的那边'; let str1 = escape(str); let str2
    = unescape(str1) console.log('编码：'+str1); // 编码:
    %u5728%u5C71%u7684%u90A3%u8FB9 console.log('解码：'+str2); //
    解码:在山的那边
  </script>
  ```

  :::

## AES/DES 加解密

- `对称加密算法` 是应用较早的加密算法，技术成熟。在对称加密算法中，数据发信方将明文（原始数据）和 加密密钥 一起经过特殊加密算法处理后，使其变成复杂的加密密文发送出去。收信方收到密文后，若想解读原文，则需要使用加密用过的密钥及相同算法的逆算法对密文进行解密，才能使其恢复成可读明文。在对称加密算法中，使用的密钥只有一个，发收信双方都使用这个密钥对数据进行加密和解密，这就要求解密方事先必须知道加密密钥。
- 优缺点:

  - 优点：算法公开、计算量小、加密速度快、加密效率高。
  - 缺点：
    - 交易双方都使用同样钥匙，安全性得不到保证。
    - 每对用户每次使用对称加密算法时，都需要使用其他人不知道的惟一钥匙，这会使得发收信双方所拥有的钥匙数量呈几何级数增长，密钥管理成为用户的负担。对称加密算法在分布式网络系统上使用较为困难，主要是因为密钥管理困难，使用成本较高。

::: code-group

```js
var aseKey = "12345678"; //秘钥必须为：8/16/32位

var message = "13785624612";

//加密

var encrypt = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(aseKey), {
  mode: CryptoJS.mode.ECB,

  padding: CryptoJS.pad.Pkcs7
}).toString();

console.log(encrypt); // nghezF3gdksGtRRx1f5Iog==

//解密

var decrypt = CryptoJS.AES.decrypt(encrypt, CryptoJS.enc.Utf8.parse(aseKey), {
  mode: CryptoJS.mode.ECB,

  padding: CryptoJS.pad.Pkcs7
}).toString(CryptoJS.enc.Utf8);

console.log(decrypt); // 13785624612
```

:::
