# 探索 PM2：Node.js 应用的“护航舰”

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'PM2',linkUrl:'https://github.com/Unitech/pm2'},{linkText:'PM2 官网',linkUrl:'https://pm2.keymetrics.io/'}]" />

![/aedf3f74-312b-ce5d-866f-6155557dbf29.png](/aedf3f74-312b-ce5d-866f-6155557dbf29.png)

## 什么是 `PM2`？

`PM2` 是一个用于管理和监控 `Node.js` 应用的进程管理器。它可以帮助你轻松启动、停止、重启和监控 `Node.js` 应用，确保它们在各种环境下都能稳定运行。无论你是要在生产环境中部署应用，还是在开发过程中进行调试，`PM2` 都能为你提供全方位的支持。简单来说，`PM2` 就是你的“护航舰”，让你的应用在风雨中也能平稳航行。

## 使用方式

::: code-group

```bash [npm 安装]
npm install pm2 -g
```

```bash [终端使用]
// 启动应用
pm2 start app.js

// 查看应用状态
pm2 list

// 停止应用
pm2 stop app.js

// 重启应用
pm2 restart app.js

// 查看应用日志
pm2 logs

// 保存当前进程列表
pm2 save

// 加载保存的进程列表
pm2 resurrect
```

:::

## `PM2` 的优劣势

### 优势

- <imp-text-danger>高效性</imp-text-danger>：`PM2` 的进程管理和负载均衡功能使得应用的性能和稳定性大大提升。

- <imp-text-danger>灵活性</imp-text-danger>：`PM2` 提供了丰富的配置选项和插件机制，允许开发者根据需求自定义应用管理。

- <imp-text-danger>稳定性</imp-text-danger>：`PM2` 提供了稳定的进程管理和监控功能，确保应用在生产环境中的稳定运行。

- <imp-text-danger>易用性</imp-text-danger>：`PM2` 的 API 设计简洁直观，易于上手，并且提供了良好的文档支持。

- <imp-text-danger>社区支持</imp-text-danger>：作为一个开源项目，`PM2` 得到了社区的广泛支持和贡献，不断进行改进和优化。

### 劣势

- <imp-text-danger>学习曲线</imp-text-danger>：对于新手来说，`PM2` 的配置选项较多，可能需要一些时间来熟悉和掌握。

- <imp-text-danger>资源消耗</imp-text-danger>：在某些高并发场景下，`PM2` 可能会带来一定的资源消耗，需要进行合理配置和优化。

## 使用 `PM2` 需要注意的地方

- <imp-text-danger>合理配置进程数量</imp-text-danger>：在使用 `PM2` 时，根据服务器的实际资源情况合理配置进程数量，避免过度消耗资源。

- <imp-text-danger>监控应用性能</imp-text-danger>：在实际应用中，注意监控应用性能，及时进行优化和调整。

- <imp-text-danger>处理进程异常</imp-text-danger>：在处理进程管理时，注意捕获和处理各种异常情况，确保应用的稳定性。

- <imp-text-danger>升级依赖</imp-text-danger>：保持 `PM2` 库的最新版本，及时获取最新的功能和性能优化。

- <imp-text-danger>团队协作</imp-text-danger>：在需要多人协作的项目中，建议团队共同维护和更新进程配置，确保应用管理的一致性和稳定性。
