# 简化 Web 应用程序的 IndexedDB 管理 —— idb.js

<article-info/>

git：[https://github.com/verybigorange/idb-js](https://github.com/verybigorange/idb-js)

文档地址：[https://verybigorange.github.io/idb-js/](https://verybigorange.github.io/idb-js/)

## IDB.js: 简化 Web 应用程序的 IndexedDB 管理

在现代 Web 开发中，离线存储能力变得越来越重要，IndexedDB 作为浏览器内置的一种 NoSQL 数据库，提供了解决这个问题的强大工具。然而，其 API 相对复杂，对于开发者来说可能存在学习曲线。为此，我们向您推荐 idb-js，一个简洁易用的 IndexedDB 库，旨在让数据操作变得更加简单和直观。

## 项目简介

idb-js 是一个轻量级的 JavaScript 库，它抽象了 IndexedDB 的底层细节，提供了 Promise 支持的一致 API，帮助开发者更方便地进行数据的增删查改。通过 idb-js，你可以专注于业务逻辑，而无需深陷于复杂的数据库操作之中。

## 应用场景

idb-js 适用于需要离线数据存储的任何 Web 应用，例如 PWA（渐进式 Web 应用）、离线地图、音乐播放器等，它可以让你的应用即使在网络不稳定或者无网络的情况下也能正常运行。

## 使用（`v1.*` 版本）

由于早些项目里使用的 `v1.*` 的版本，这里我们介绍下 `v1.*` 版本的使用方式，`v2.*` 版本的使用方式见顶部最新的连接。

### 安装：

::: code-group

```bash
npm install idb-js --save
```

:::

### 使用：

::: code-group

```js [数据库配置]
// in db_student_config.js
export default {
  dbName: "student", // *数据库名称
  version: 1, // 数据库版本号（默认为当前时间戳）
  tables: [
    // *数据库的表，即ObjectStore
    {
      tableName: "grade", // *表名
      option: { keyPath: "id" }, // 表配置，即ObjectStore配置，此处指明主键为id
      indexs: [
        // 数据库索引（建议加上索引）
        {
          key: "id", // *索引名
          option: {
            // 索引配置，此处表示该字段不允许重复
            unique: true
          }
        },
        {
          key: "name"
        },
        {
          key: "score"
        }
      ]
    },
    {
      tableName: "info", // *表名 另外一张表，同理
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "name"
        },
        {
          key: "age"
        },
        {
          key: "sex"
        }
      ]
    }
  ]
};
```

```js [使用配置]
// 1. 引入 Idb
import Idb from "idb-js"; // 引入 Idb
// 2. 引入数据库配置
import db_student_config from "./db_student_config";
// 3. 载入配置，数据库开启成功拿到数据库实例进行操作
Idb(db_student_config).then((student_db) => {
  // ...
});
```

:::

#### 数据库实例 db 方法

::: warning 注意
因为查询操作多条数据是采用游标方式，所以操作单条数据的时候建议采用主键或者索引的的方式效率更高

采用游标的方法时，其中 condition 需要返回条件（很多小伙伴忽略了这点，特别说明^-^）
:::

- 数据库与表（store）

  | 方法        | 方法名           | 参数                        | 参数属性                             |
  | :---------- | :--------------- | :-------------------------- | :----------------------------------- |
  | close_db    | 关闭数据库       | 空                          | -                                    |
  | delete_db   | 删除数据库       | 空                          | -                                    |
  | clear_table | 清空某张表的数据 | <span v-pre>{Object}</span> | tableName {String} 表名 （required） |

- 添加（insert）

  | 方法   | 方法名               | 参数                        | 参数属性                                                                                                                                            |
  | :----- | :------------------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
  | insert | 添加单条或者多条数据 | <span v-pre>{Object}</span> | <span v-pre>tableName {String} 表名 （required） <br/> data {Object \| Array} 添加的值 （required） <br/> success {Function} 添加成功的回调 </span> |

- 查询（query）

  | 方法                | 方法名                                       | 参数                        | 参数属性                                                                                                                                                                                                  |
  | :------------------ | :------------------------------------------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | query               | 查询匹配到的数据（可查询多条数据,游标）      | <span v-pre>{Object}</span> | <span v-pre>tableName {String} 表名 （required） <br/> condition {Function} 匹配条件（required） <br/> success {Function} 查询成功的回调 @arg {Array} 接收结果 </span>                                    |
  | query_by_primaryKey | 通过主键查询某条数据                         | <span v-pre>{Object}</span> | <span v-pre>tableName {String} 表名 （required） <br/> target { String \| Number } 主键值 （required）<br/> success {Function} 查询成功的回调 @arg {Array} 接收结果 </span>                               |
  | query_by_index      | 通过索引查询某条数据（数据库必须建立了索引） | <span v-pre>{Object}</span> | <span v-pre>tableName {String} 表名 （required） <br/> indexName { String } 目标索引 （required） <br/>target { String \| Number } 目标索引值 （required）<br/> success {Function} 添加成功的回调 </span> |
  | queryAll            | 查询某张表的所有数据                         | <span v-pre>{Object}</span> | <span v-pre>tableName {String} 表名 （required） <br/> success {Function} 查询成功的回调 @arg {Array} 接收结果 </span>                                                                                    |

- 删除（delete）

  | 方法                 | 方法名                           | 参数                        | 参数属性                                                                                                                                                          |
  | :------------------- | :------------------------------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | delete               | 删除数据（可删除多条数据，游标） | <span v-pre>{Object}</span> | <span v-pre>tableName {String} 表名 （required） <br/> condition {Function} 匹配条件 （required） <br/> success {Function} 删除成功的回调 </span>                 |
  | delete_by_primaryKey | 通过主键删除某条数据             | <span v-pre>{Object}</span> | <span v-pre>tableName {String} 表名 （required） <br/> target { String \| Number } 主键值 （required）<br/> success {Function} 删除成功的回调 @arg {Null} </span> |

- 修改（update）

  | 方法                 | 方法名                           | 参数                        | 参数属性                                                                                                                                                                                                                                         |
  | :------------------- | :------------------------------- | :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | update               | 修改数据（可更改多条数据，游标） | <span v-pre>{Object}</span> | <span v-pre>tableName {String} 表名 （required） <br/> condition {Function} 匹配条件 （required） <br/> handle {Function} 修改方式 （required） @arg {Object} 修改项 <br/>success {Function} 修改成功的回调 @arg {Array} 返回被修改后项 </span>  |
  | update_by_primaryKey | 通过主键更改某条数据             | <span v-pre>{Object}</span> | <span v-pre>tableName {String} 表名 （required） <br/> target { String \| Number } 主键值 （required）<br/> handle {Function} 修改方式 （required） @arg {Object} 修改项 <br/> success {Function} 删除成功的回调 @arg {Object} 修改后的值</span> |

::: code-group

```js
// 载入数据配置，数据库开启成功后会拿到db来对数据库进行操作

import Idb from "idb-js"; //  引入Idb
import db_student_config from "./db_student_config"; //  引入数据库配置

Idb(db_student_config).then(
  (student_db) => {
    //  载入配置，数据库开启成功后返回该数据库实例

    /**
     * @method close_db 关闭此数据库
     * */

    student_db.close_db();

    /**
     * @method delete_db 删除此数据库
     * */

    student_db.delete_db();

    /**
     * @method 增加单条数据
     * */

    student_db.insert({
      tableName: "grade",
      data: {
        id: 1,
        score: 98,
        name: "小明"
      },
      success: () => console.log("添加成功")
    });

    /**
     * @method 增加多条数据
     * */

    student_db.insert({
      tableName: "grade",
      data: [
        {
          id: 1,
          score: 98,
          name: "小明"
        },
        {
          id: 2,
          score: 99,
          name: "小方"
        }
      ],
      success: () => console.log("添加成功")
    });

    /**
     * @method 查询数据（游标）
     * */

    student_db.query({
      tableName: "grade",
      condition: (item) => item.score == 100,
      success: (r) => {
        console.log(r);
      }
    });

    /**
     * @method 修改数据
     * */

    student_db.update({
      tableName: "grade",
      condition: (item) => item.name == "小明",
      handle: (r) => {
        r.score = 80;
      },
      success: (r) => {
        console.log("修改成功", r);
      }
    });

    /**
     * @method 删除数据
     * */

    student_db.delete({
      tableName: "grade",
      condition: (item) => item.name == "小明",
      success: (res) => {
        console.log("删除成功");
      }
    });

    /**
     * @method 查询某张表的所有数据
     * */
    student_db.queryAll({
      tableName: "grade",
      success: (res) => {
        console.log(res);
      }
    });

    /**
     * @method 根据主键查询某条数据
     * */
    student_db.query_by_primaryKey({
      tableName: "grade",
      target: 1,
      success: (res) => {
        console.log(res);
      }
    });

    /**
     * @method 根据索引查询某条数据
     * */
    student_db.query_by_index({
      tableName: "grade",
      indexName: "name",
      target: "小明",
      success: (res) => {
        console.log(res);
      }
    });

    /**
     * @method 清空某张表的数据
     * */
    student_db.clear_table({
      tableName: "grade"
    });

    /**
     * @method 通过主键删除某条数据
     * */
    student_db.delete_by_primaryKey({
      tableName: "grade",
      target: 1,
      success: () => console.log("删除成功")
    });

    /**
     * @method 通过主键更改某条数据
     * */
    student_db.update_by_primaryKey({
      tableName: "grade",
      target: 1,
      handle: (val) => (val.score = 101),
      success: (res) => {
        console.log(res);
      }
    });
  },
  (err) => {
    console.log(err);
  }
);
```

:::

::: warning
删除数据库是 `异步操作`，如果需要删除后做一些操作，可以按照方式：
::: code-group

```js
// 删除 indexedDB 数据库
// idb.js 源码，删除封装的也是这个代码：indexedDB.deleteDatabase(dbName)，但也仅此而已
const idbReq = indexedDB.deleteDatabase(db_student_config.dbName);
// 删除成功的回调
idbReq.onsuccess = function (event) {
  console.log("删除数据库成功");
};
// 删除失败的回调
idbReq.onerror = function (event) {
  console.log("删除数据库失败");
};
```

:::
