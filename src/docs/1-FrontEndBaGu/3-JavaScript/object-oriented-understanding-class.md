# 面向对象：认识 “类”

<article-info/>

## 类的继承

继承可以描述类与类之间的关系

坦克、玩家坦克、敌方坦克玩家坦克是坦克，敌方坦克是坦克

如果 A 和 B 都是类，并且可以描述为 A 是 B，则 A 和 B 形成继承关系

- B 是父类，A 是子类
- B 派生 A，A 继承自 B
- B 是 A 的基类，A 是 B 的派生类

![/52dc8ada-2163-1572-dae8-b0fbdc39885c.png](/52dc8ada-2163-1572-dae8-b0fbdc39885c.png)

::: code-group

```ts
export class Tank {
  x: number = 0;
  y: number = 0;
}
export class PlayerTank extends Tank {}
export class EnemyTank extends Tank {}
```

:::

## 成员的重写

重写(override)：子类中覆盖父类的成员

子类成员不能改变父类成员的类型

无论是属性还是方法，子类都可以对父类的相应成员进行重写，但是重写的时候需要保证类型的匹配

::: code-group

```ts
export class Tank {
  x: number = 0;
  y: number = 0;
}

export class PlayerTank extends Tank {
  x: string = "20"; // [!code error] //❗错误：类型不一致，不能重写
  y: number = 0;
}

export class EnemyTank extends Tank {}

const p = new PlayerTank();
console.log(p.x, p.y);
```

:::

::: code-group

```ts
export class Tank {
  x: number = 0;
  y: number = 0;

  shoot() {
    console.log("发射子弹");
  }
}

export class PlayerTank extends Tank {
  x: number = 20;
  y: number = 0;

  shoot(speed: number) {
    // [!code error]//❗方法可以重写，但是参数成员不匹配
    console.log("玩家坦克发射子弹"); // [!code error]
  } // [!code error]
}

export class EnemyTank extends Tank {
  shoot() {
    console.log("敌方坦克发射子弹");
  }
}
```

:::

::: tip ❓ 遇到上面的方法重写不了的情况，比如玩家坦克类 shoot 方法需要参数，敌方坦克类 shoot 方法不需要参数，这种情况怎么办？

1. 去掉父类里的方法，不在继承，子类里各定义各的
2. 把子类的参数，定义为子类的成员，然后在子类方法里通过 **`this.`** 调用

::: warning ❗ 注意
**`this`** 关键字：在继承关系中，this 的指向是动态的 —— 调用方法时，更具具体的调用者确定 **`this`** 的执行，即 **`谁调用，this 指向谁`**
:::

## 类型匹配

鸭子辨型法

子类的对象，始终可以赋值给父类

面向对象中，这种现象，叫做里氏替换原则

如果需要判断一个数据的具体子类类型，可以使用 **`instanceof`**

::: code-group

```ts
export class Tank {
  name: string = 'tank'
}
export class PlayerTank extends Tank {
	name: string = '玩家 tank'
	life: number= 10
}
export class EnemyTank extends Tank {
	...
}

let p: Tank = new PlayerTank()
p.life = 3 // 这里类型检查不会通过，因为不能确认 p 到底是不是 PlayerTank，只有 PlayerTank 才有 life 属性
if (p instanceof PlayerTank) {
	p.life = 3 // 这里就没有问题，因为前面判断通过后，p 必然是 PlayerTank，它有 life 属性
}
```

:::

## TS 中的修饰符

**`readonly`**：只读修饰符

访问权限修饰符：**`private`** **`public`** **`protected`**

**`protected`**：受保护的成员，只能在自身和子类中访问

::: code-group

```ts
export class Tank {
  protected name: string = '坦克'

  sayHello(){
    console.log(`我是一个${this.name}`)
  }
}
export class PlayerTank extends Tank {
	protected name: string = '玩家tank'// [!code warning] //❗外部访问不了，只能类的内部访问
	life: number= 5
}
export class EnemyTank extends Tank {
	...
}

let p: Tank = new PlayerTank()
p.sayHello()
if (p instanceof PlayerTank) {
	console.log(p.life)
}
```

:::

## 单根性和传递性

- 单根性：每个类最多只能拥有一个父类

- 传递性：如果 A 是 B 的父类，并且 B 是 C 的父类，则，可以认为 A 也是 C 的父类
