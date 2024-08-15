# 了解过 JWT 吗？

<article-info/>

## http 无状态协议

`web` 应用采用 `browser/server` 架构，`http` 作为通信协议。`http` 是无状态协议，浏览器每次请求，服务器会独立处理，不与前后请求产生关联，此过程用下图说明，三次请求之间没有任何联系。

![/2f363a43-0c89-4d43-33e4-1bb570f5b659.png](/2f363a43-0c89-4d43-33e4-1bb570f5b659.png)

但这意味着，任何用户能通过浏览器访问服务器资源，如果想保护服务器某些资源，必须限制浏览器请求，鉴别浏览器请求合法请求，忽略非法请求，`http` 协议是无状态的，可以让服务器与浏览器维护一个状态，这就是会话机制。

## JSON Web Token 是什么

`JSON Web Token (JWT)` 是一个开放标准(RFC 7519)，它定义了一种紧凑的、自包含的方式，用于作为 `JSON` 对象在各方之间安全地传输信息。该信息可以被验证和信任，因为它是数字签名的。

## 什么时候你应该用 JSON Web Token

- `Authorization (授权)` : 这是使用 `JWT` 的最常见场景。一旦用户登录，后续每个请求都将包含 `JWT`，允许用户访问该令牌允许的路由、服务和资源。单点登录是现在广泛使用的 `JWT` 的一个特性，因为它的开销很小，并且可以轻松地跨域使用。
- `Information Exchange (信息交换)` : 对于安全的在各方之间传输信息而言，`JSON Web Tokens` 无疑是一种很好的方式。因为 `JWT` 可以被签名，例如，用公钥/私钥对，你可以确定发送人就是它们所说的那个人。另外，由于签名是使用头和有效负载计算的，您还可以验证内容没有被篡改。

::: tip JWT 官网
[**https://jwt.io/**](https://jwt.io/)
:::

## JWT 的构成

![/a326bed7-90ab-bd06-c6e7-ecb9acbb7808.png](/a326bed7-90ab-bd06-c6e7-ecb9acbb7808.png)

`JWT` 由三部分构成，它们之间用圆点(.)连接。分别是：`Header.Payload.Signature`

- `Header`（头部）
  `jwt` 的头部承载两部分信息

  - 声明类型，这里是 `jwt`
  - 声明加密的算法 通常直接使用 `HMAC` `SHA256`
    这里的加密算法是单向函数散列算法，常见的有 `MD5`、`SHA`、`HAMC`。这里使用基于密钥的 Hash 算法 `HMAC` 生成散列值。
  - `MD5 message-digest algorithm 5 （信息-摘要算法）`缩写，广泛用于加密和解密技术，常用于文件校验。校验？不管文件多大，经过 `MD5` 后都能生成唯一的 `MD5` 值
  - `SHA (Secure Hash Algorithm，安全散列算法）`，数字签名等密码学应用中重要的工具，安全性高于 `MD5`
  - `HMAC (Hash Message Authentication Code)`，散列消息鉴别码，基于密钥的 `Hash` 算法的认证协议。用公开函数和密钥产生一个固定长度的值作为认证标识，用这个标识鉴别消息的完整性。常用于接口签名验证。

  ::: code-group

  ```js
  {
    'typ': 'JWT',
    'alg': 'HS256'
  }
  ```

  :::

  然后将头部进行 `base64` 加密（该加密是可以对称解密的）,构成了第一部分

  ::: code-group

  ```text
  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
  ```

  :::

- `Payload（有效载荷）`

  载荷就是存放有效信息的地方，这些有效信息包含三个部分：

  - 标准中注册的声明
  - 公共的声明
  - 私有的声明
    标准中注册的声明 (建议但不强制使用) ：
  - `iss`: jwt 签发者
  - `sub`: jwt 所面向的用户
  - `aud`: 接收 jwt 的一方
  - `exp`: jwt 的过期时间，这个过期时间必须要大于签发时间
  - `nbf`: 定义在什么时间之前，该 jwt 都是不可用的.
  - `iat`: jwt 的签发时间
  - `jti`: jwt 的唯一身份标识，主要用来作为一次性 token,从而回避重放攻击。
    公共的声明：
    公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密
    私有的声明：
    私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为 base64 是对称解密的，意味着该部分信息可以归类为明文信息。
    定义一个 payload:

  ::: code-group

  ```js
  {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
  }
  ```

  :::

  然后将其进行 `base64` 加密，得到 `Jwt` 的第二部分：

  ::: code-group

  ```text
  eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9
  ```

  :::

- `Signature（签名）`

  JWT 的第三部分是一个签证信息，这个签证信息由三部分组成

  ::: code-group

  ```text
  header (base64后的)
  payload (base64后的)
  secret
  ```

  :::

  这个部分需要 `base64` 加密后的 `header` 和 `base64` 加密后的 `payload` 使用.连接组成的字符串， 然后通过 `header` 中声明的加密方式进行加盐 `secret` 组合加密，然后就构成了 `jwt` 的第三部分。

  ::: code-group

  ```js
  // javascript
  var encodedString = base64UrlEncode(header) + "." + base64UrlEncode(payload);
  var signature = HMACSHA256(encodedString, "secret"); // TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
  ```

  :::

  将这三部分用.连接成一个完整的字符串,构成了最终的 `jwt`:

  ::: code-group

  ```text
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
  ```

  :::

  ::: warning ⚠️ 注意
  `secret` 是保存在服务器端的，`jwt` 的签发生成也是在服务器端的，`secret` 就是用来进行 `jwt` 的签发和 `jwt` 的验证， 所以，它就是你服务端的私钥，在任何场景都不应该流露出去。一旦客户端得知这个 `secret`, 那就意味着客户端是可以自我签发 `jwt` 了

  ![/b9812e8f-1b72-97a5-d558-f0c995387648.png](/b9812e8f-1b72-97a5-d558-f0c995387648.png)
  :::

## JWT 的认证流程

前端把账号密码发送给后端的接口
后端核对账号密码成功后，把用户 `id` 等其他信息作为 `JWT` 负载，把它和头部分别进行 `base64` 编码拼接后签名，形成一个 `JWT` (`token`).
前端每次请求时都会把 `JWT` 放在 `HTTP` 请求头的 `Authorization` 字段内
后端检查是否存在，如果存在就验证 `JWT` 的有效性(签名是否正确，`token` 是否过期)
验证通过后后端使用 `JWT` 中包含的用户信息进行其他的操作，并返回对应结果简洁、包含性、因为 `Token` 是 `JSON` 加密的形式保存在客户端，所以 `JWT` 是跨语言的，原则上是任何 `web` 形式都支持。

![/ecee407c-4308-4a73-e59e-74e87e1fa999.png](/ecee407c-4308-4a73-e59e-74e87e1fa999.png)

## Token 验证优缺点

Token 作为一种身份验证和授权机制，具有以下优点和缺点：

### 优点

#### 无状态性

Token 机制使得服务器不需要在内存中保存用户的登录状态，可以轻松地实现分布式和横向扩展。

#### 跨域支持

Token 可以在跨域环境下进行传输，使得在不同域名的应用之间进行身份验证和授权变得更加灵活。

#### 安全性

Token 可以使用加密算法进行签名，确保在传输过程中不被篡改，同时可以设置过期时间，增加安全性。

#### 可扩展性

Token 可以包含任意的信息，例如用户的身份信息、权限、角色等，使得身份验证和授权机制更加灵活。

#### 适用于移动端应用

Token 机制适用于移动端应用，可以在移动设备上保存 Token 并进行安全的传输。

### 缺点

#### 需要额外的安全措施

Token 需要在客户端和服务器之间进行安全传输，需要使用 HTTPS 协议等安全措施来保证传输过程中的安全性。

#### 无法立即失效

由于 Token 是无状态的，一旦生成并发送给客户端，就无法立即失效，除非设置较短的过期时间。

#### 存储在客户端

Token 通常存储在客户端（例如 Cookie 或 LocalStorage），存在被窃取的风险，因此需要注意安全性。

#### 需要额外的开发工作

相比于传统的基于 Session 的身份验证机制，Token 需要额外的开发工作来生成、验证和管理 Token。

Token 作为一种身份验证和授权机制，具有无状态性、跨域支持、安全性等优点，但需要注意安全传输、失效管理和安全存储等方面的问题。在实际应用中，需要根据具体的场景和需求来选择合适的身份验证和授权机制。

## Token 安全策略

Token 作为一种身份验证和授权机制，需要注意以下安全问题，并采取相应的解决策略

### 窃取问题

Token 通常存储在客户端（例如 Cookie 或 LocalStorage），存在被窃取的风险。解决策略是使用 HTTPS 协议进行传输，同时在客户端存储 Token 时，可以使用加密算法进行加密，增加安全性。

### 篡改问题

Token 在传输过程中可能会被篡改，破坏身份验证和授权机制。解决策略是使用加密算法对 Token 进行签名，确保在传输过程中没有被篡改。

### 过期问题

由于 Token 是无状态的，一旦生成并发送给客户端，就无法立即失效，除非设置较短的过期时间。解决策略是在 Token 中设置过期时间，同时可以使用刷新 Token 的机制，让用户在一定时间内保持登录状态。

### 重放攻击问题

攻击者可以使用已经过期的 Token 进行身份验证和授权，从而获取用户的权限。解决策略是使用随机数或时间戳等方式，让每个 Token 都是唯一的，避免重放攻击。

### Token 泄露问题

如果 Token 泄露，攻击者可以使用 Token 进行身份验证和授权，获取用户的权限。解决策略是使用单次 Token 或短期 Token，避免 Token 长期存在，同时可以设置 IP 白名单和限制 Token 的使用次数等措施，增加安全性。

Token 作为一种身份验证和授权机制，需要注意安全问题，并采取相应的解决策略，例如使用 HTTPS 协议进行传输、使用加密算法进行加密、设置过期时间、使用随机数或时间戳等方式避免重放攻击、使用单次 Token 或短期 Token 等措施增加安全性。
