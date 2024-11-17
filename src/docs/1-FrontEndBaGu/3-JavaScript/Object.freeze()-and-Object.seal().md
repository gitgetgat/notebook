# 如何理解 JavaScript 中的 Object.freeze() 和 Object.seal()

<article-info/>

## 什么是 `Object.freeze()`？

`Object.freeze()`是一个可以将对象冻结的方法。一旦对象被冻结，就不能添加、删除或修改其属性。这在需要确保对象完整性、防止任何意外或故意更改的场景中非常有用。

### 示例与解释

::: code-group

```js
const person = {
  name: "Alice",
  age: 30
};
Object.freeze(person);
person.age = 31; // 无效
person.address = "123 Main St"; // 不会被添加
delete person.name; // 不会删除属性
console.log(person); // 输出: { name: 'Alice', age: 30 }
```

:::

在这个例子中，我们冻结了 `person` 对象。尝试修改任何属性、添加新属性或删除现有属性都不会生效。`person` 对象保持不变，保留了其初始状态。

### 应用场景

- <imp-text-danger>不可变数据结构</imp-text-danger>：在处理不应更改的数据（如配置对象或常量）时，冻结这些对象可以确保它们在应用程序的整个生命周期内保持一致。

- <imp-text-danger>状态管理</imp-text-danger>：在状态管理场景中，尤其是在使用 Redux 等库时，确保状态不可变性至关重要。冻结状态对象可以防止意外的变化，从而带来更可预测的状态过渡。

## 什么是 `Object.seal()`？

`Object.seal()` 是一个可以限制对象结构变化的方法。虽然它不像 `Object.freeze()` 那样使对象完全不可变，但它可以防止添加或删除属性。然而，只要现有属性是可写的，它们仍然可以被修改。

### 示例与解释

::: code-group

```js
const car = {
  make: "Toyota",
  model: "Corolla"
};
Object.seal(car);
car.model = "Camry"; // 可以修改现有属性
car.year = 2020; // 不会被添加
delete car.make; // 不会删除属性
console.log(car); // 输出: { make: 'Toyota', model: 'Camry' }
```

:::

在这个例子中，`car` 对象被封闭。我们可以修改现有的属性，如更改 `model` 属性。但是，尝试添加新属性或删除现有属性都会被阻止。

### 应用场景

`API` 响应数据：在处理从 `API` 接收的数据时，封闭对象可以确保结构的一致性。你可以更新现有数据，而不必担心意外的添加或删除会破坏应用逻辑。
控制可变性：在需要允许某些可变性但又要防止结构性变化的情况下，`Object.seal()`提供了一种平衡。这在处理表单数据时尤其有用，某些字段是可编辑的，但整体结构应该保持不变。
