<template>
  <el-table
    class="ast-table"
    :data="tableData"
    :border="false"
    stripe
  >
    <el-table-column type="index" />
    <el-table-column
      prop="propName"
      label="类型名称"
    />
    <el-table-column
      prop="zhName"
      label="中文名称"
    />
    <el-table-column
      prop="desc"
      label="描述"
    />
  </el-table>
</template>

<script setup>
const tableData = [
  {
    propName: 'Program',
    zhName: '程序主体',
    desc: '代表整段代码的主体',
  },
  {
    propName: 'VariableDeclaration   VariableDeclarator',
    zhName: '变量声明',
    desc: '代表变量声明，其中 VariableDeclaration 是包含一个或多个 VariableDeclarator 的父节点。',
  },
  {
    propName: 'FunctionDeclaration   FunctionExpression',
    zhName: '函数声明',
    desc: '代表函数声明和函数表达式。',
  },
  {
    propName: 'Identifier',
    zhName: '标识符',
    desc: '代表标识符，如变量名、函数名等',
  },
  {
    propName: 'Literal',
    zhName: '字面量',
    desc: '代表字面量，如数字、字符串、布尔值等',
  },
  {
    propName: 'CallExpression',
    zhName: '函数调用',
    desc: '代表函数调用',
  },
  {
    propName: 'MemberExpression',
    zhName: '成员访问',
    desc: '代表成员访问，如 object.property 或 object[method]。',
  },
  {
    propName: 'BinaryExpression',
    zhName: '二元表达式',
    desc: '代表二元表达式，如 a + b 或 a > b。',
  },
  {
    propName: 'UnaryExpression',
    zhName: '一元表达式',
    desc: '代表一元表达式，如 !a 或 ++b。',
  },
  {
    propName: 'AssignmentExpression',
    zhName: '赋值表达式',
    desc: '代表赋值表达式，如 a = b 或 a += b。',
  },
  {
    propName: 'BlockStatement',
    zhName: '代码块',
    desc: '代表代码块，通常由大括号 {} 包围。',
  },
  {
    propName: 'IfStatement',
    zhName: 'if 条件语句',
    desc: '代表 if 条件语句，如if() {}',
  },
  {
    propName: 'ForStatement   WhileStatement',
    zhName: 'for 循环和 while 循环',
    desc: '代表 for 循环和 while 循环',
  },
  {
    propName: 'DoWhileStatement',
    zhName: 'do...while 循环',
    desc: '代表do...while 循环',
  },
  {
    propName: 'SwitchStatement',
    zhName: 'switch 语句',
    desc: '代表 switch 语句',
  },
  {
    propName: 'CaseClause   DefaultClause',
    zhName: 'switch 语句中的 case 和 default 分支',
    desc: '代表 switch 语句中的 case 和 default 分支',
  },
  {
    propName: 'ReturnStatement',
    zhName: 'return 语句',
    desc: '代表 return 语句',
  },
  {
    propName: 'BreakStatement   ContinueStatement',
    zhName: 'break 和 continue 语句',
    desc: '代表 break 和 continue 语句，用于控制循环的执行',
  },
  {
    propName: 'TryStatement   CatchClause   FinallyBlock',
    zhName: 'try...catch...finally 异常处理',
    desc: '代表 try...catch...finally 异常处理结构',
  },
  {
    propName: 'ThrowStatement',
    zhName: 'throw 语句',
    desc: '代表 throw 语句，用于抛出异常',
  },
  {
    propName: 'DebuggerStatement',
    zhName: '调试器语句',
    desc: '代表调试器语句，用于断点调试',
  },
  {
    propName: 'ThisExpression',
    zhName: 'this 关键字',
    desc: '代表 this 关键字',
  },
  {
    propName: 'ArrayExpression',
    zhName: '数组字面量',
    desc: '代表数组字面量',
  },
  {
    propName: 'ObjectExpression',
    zhName: '对象字面量',
    desc: '代表对象字面量',
  },
  {
    propName: 'Property',
    zhName: '对象字面量中的属性',
    desc: '代表对象字面量中的属性',
  },
  {
    propName: 'SpreadElement',
    zhName: '数组或对象字面量中的扩展操作符 ...',
    desc: '代表在数组或对象字面量中的扩展操作符 ...',
  },
  {
    propName: 'TemplateLiteral',
    zhName: '模板字符串',
    desc: '代表模板字符串',
  },
  {
    propName: 'TaggedTemplateExpression',
    zhName: '标签模板字符串',
    desc: '代表标签模板字符串',
  },
  {
    propName: 'ArrowFunctionExpression',
    zhName: '箭头函数',
    desc: '代表箭头函数',
  },
  {
    propName: 'ClassDeclaration   ClassExpression',
    zhName: '类声明和类表达式',
    desc: '代表类声明和类表达式',
  },
  {
    propName: 'Super',
    zhName: 'super 关键字',
    desc: '代表 super 关键字，用于调用父类方法',
  },
  {
    propName: 'ImportDeclaration   ExportNamedDeclaration   ExportDefaultDeclaration',
    zhName: 'ES6 模块的导入和导出语句',
    desc: '代表 ES6 模块的导入和导出语句。',
  },
]
</script>
