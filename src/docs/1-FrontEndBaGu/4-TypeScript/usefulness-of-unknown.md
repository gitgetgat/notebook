# unknown 的用处

<article-info/>

`unknown` 是 `TypeScript` 中的一种顶级类型，它表示一个未知的值。与 `any` 类型不同，`unknown` 类型更加类型安全。

当一个值被标记为 `unknown` 类型时，它只能赋值给 `unknown` 或 `any` 类型。这意味着我们不能对 `unknown` 类型的值执行任何操作，除非我们首先进行类型检查或类型断言。

```typescript
let value: unknown;

value = 5; // 正确，可以将数字赋值给 unknown 类型
value = "Hello"; // 正确，可以将字符串赋值给 unknown 类型
value = true; // 正确，可以将布尔值赋值给 unknown 类型

// 进行类型检查
if (typeof value === "number") {
  let num: number = value; // 正确，因为在此分支中，value 已被确定为 number 类型
}

// 进行类型断言
let strLength: number = (value as string).length; // 正确，使用类型断言将 value 断言为 string 类型，并获取其长度
```

::: warning
需要注意的是，由于 unknown 类型的值是未知的，因此在使用它之前，我们必须对其进行某种类型的检查或断言以确定其真实类型。
:::

来看下 Vue 中的使用：

```typescript
export function isReactive(value: unknown): boolean {
  if (isReadonly(value)) {
    return isReactive((value as Target)[ReactiveFlags.RAW]);
  }
  return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE]);
}
```

在 `isReactive` 函数中，使用了 `unknown` 类型作为参数，并使用了类型断言将 `value` 断言为 `Target` 类型。
